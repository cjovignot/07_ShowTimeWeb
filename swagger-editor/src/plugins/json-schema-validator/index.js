// JSON-Schema ( draf04 ) validator
import JsonSchemaWebWorker from "./validator.worker.js"
import YAML from "js-yaml"
import PromiseWorker from "promise-worker"
import debounce from "lodash/debounce"
import swagger2SchemaYaml from "./swagger2-schema.yaml"
import oas3SchemaYaml from "./oas3-schema.yaml"

const swagger2Schema = YAML.load(swagger2SchemaYaml)
const oas3Schema = YAML.load(oas3SchemaYaml)

// Lazily created promise worker
let _promiseWorker = null

const getWorker = () => () => {
  if (_promiseWorker === null) {
    _promiseWorker = new PromiseWorker(new JsonSchemaWebWorker())
  }
  return _promiseWorker
}

const terminateWorker = () => () => {
  if (_promiseWorker) {
    _promiseWorker._worker.terminate()
    _promiseWorker = null
  }
}

export const addSchema = (schema, schemaPath = []) => ({ jsonSchemaValidatorActions }) => {
  jsonSchemaValidatorActions.getWorker().postMessage({
    type: "add-schema",
    payload: {
      schemaPath,
      schema
    }
  })
}

// Figure out what schema we need to use ( we're making provision to be able to do sub-schema validation later on)
// ...for now we just pick which base schema to use (eg: openapi-2-0, openapi-3.0, etc)
export const getSchemaBasePath = () => ({ specSelectors }) => {
  // Eg: [openapi-3.0] or [openapi-2-0]
  // later on... ["openapi-2.0", "paths", "get"]
  const isOAS3 = specSelectors.isOAS3 ? specSelectors.isOAS3() : false
  const isSwagger2 = specSelectors.isSwagger2
    ? specSelectors.isSwagger2()
    : false
  const isAmbiguousVersion = isOAS3 && isSwagger2

  // Refuse to handle ambiguity
  if (isAmbiguousVersion) return []

  if (isSwagger2) return ["openapi-2.0"]

  if (isOAS3) return ["openapi-3.0"]
}

export const setup = () => ({ jsonSchemaValidatorActions }) => {
  // Add schemas , once off
  jsonSchemaValidatorActions.addSchema(swagger2Schema, ["openapi-2.0"])
  jsonSchemaValidatorActions.addSchema(oas3Schema, ["openapi-3.0"])
}

export const validate = ({ spec, path = [], ...rest }) => system => {
  // stagger clearing errors, in case there is another debounced validation
  // run happening, which can occur when the user's typing cadence matches
  // the latency of validation
  // TODO: instead of using a timeout, be aware of any pending validation
  // promises, and use them to schedule error clearing.
  setTimeout(() => {
    system.errActions.clear({
      source: system.jsonSchemaValidatorSelectors.errSource()
    })
  }, 50)
  system.jsonSchemaValidatorActions.validateDebounced({ spec, path, ...rest })
}

// Create a debounced validate, that is lazy
let _debValidate
export const validateDebounced = (...args) => system => {
  // Lazily create one...
  if (!_debValidate) {
    _debValidate = debounce((...args) => {
      system.jsonSchemaValidatorActions.validateImmediate(...args)
    }, 200)
  }
  return _debValidate(...args)
}

export const validateImmediate = ({ spec, path = [] }) => system => {
  // schemaPath refers to type of schema, and later might refer to sub-schema
  const baseSchemaPath = system.jsonSchemaValidatorSelectors.getSchemaBasePath()

  // No base path? Then we're unable to do anything...
  if (!baseSchemaPath.length)
    throw new Error("Ambiguous schema path, unable to run validation")

  return system.jsonSchemaValidatorActions.validateWithBaseSchema({
    spec,
    path: [...baseSchemaPath, ...path]
  })
}

export const validateWithBaseSchema = ({ spec, path = [] }) => system => {
  const errSource = system.jsonSchemaValidatorSelectors.errSource()


  return system.jsonSchemaValidatorActions.getWorker()
    .postMessage({
      type: "validate",
      payload: {
        jsSpec: spec,
        specStr: system.specSelectors.specStr(),
        schemaPath: path,
        source: errSource
      }
    })
    .then(
      ({ results, path }) => {
        system.jsonSchemaValidatorActions.handleResults(null, {
          results,
          path
        })
      },
      err => {
        system.jsonSchemaValidatorActions.handleResults(err, {})
      }
    )
}

export const handleResults = (err, { results }) => system => {
  if (err) {
    // Something bad happened with validation.
    throw err
  }

  system.errActions.clear({
    source: system.jsonSchemaValidatorSelectors.errSource()
  })

  if (!Array.isArray(results)) {
    results = [results]
  }

  // Filter out anything funky
  results = results.filter(val => typeof val === "object" && val !== null)

  if (results.length) {
    system.errActions.newSpecErrBatch(results)
  }
}

export default function() {
  return {
    afterLoad: system => system.jsonSchemaValidatorActions.setup(),
    statePlugins: {
      jsonSchemaValidator: {
        actions: {
          getWorker,
          terminateWorker,
          addSchema,
          validate,
          handleResults,
          validateDebounced,
          validateImmediate,
          validateWithBaseSchema,
          setup
        },
        selectors: {
          getSchemaBasePath,
          errSource() {
            // Used to identify the errors generated by this plugin
            return "structural"
          }
        }
      },
      spec: {
        wrapActions: {
          validateSpec: (ori, system) => (...args) => {
            ori(...args)
            const [spec, path] = args
            system.jsonSchemaValidatorActions.validate({ spec, path })
          }
        }
      }
    }
  }
}
