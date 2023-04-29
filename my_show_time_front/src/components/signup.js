import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/router";  
// import styles from "../styles/globals.css";

function SignupComponent() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // function to update state of firstname with
  // value enter by user in form
  const handleChange = (e) => {
    setFirstname(e.target.value);
  };
  // function to update state of Lastname with value
  // enter by user in form
  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  // function to update state of email with value
  // enter by user in form
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // function to update state of password with
  // value enter by user in form
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // function to update state of confirm password
  // with value enter by user in form
  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  };
  // below function will be called when user
  // click on submit button .
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        router.push("/");
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="App">
      <header className="AppHeader">
        <div className="card w-96 bg-white opacity-90 text-neutral-content m-auto">
          
          <div className="items-center p-8 text-center">
          
            <h2 className="text-3xl font-bold items-center flex justify-center text-stone-950"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/128px-Disque_Vinyl.svg.png" className="logo home-logo" alt="logo"/>SIGNUP</h2>

            <form className="form" onSubmit={(e) => { handleSubmit(e); }} >
              <br />
                <input className="input w-full max-h-10" type="text" value={firstname} placeholder="First name" required onChange={(e) => { handleChange(e); }} />
              <br />
              <br />
                <input className="input w-full max-h-10" type="text" value={lastname} placeholder="Last name" required onChange={(e) => { handleLastnameChange(e); }} />
              <br />
              <br />
                <input className="input w-full max-h-10" type="email" placeholder="youremail@showtime.com" value={email} required onChange={(e) => { handleEmailChange(e); }} />
              <br />
              <br />
                <input className="input w-full max-h-10" type="password" placeholder="Password" value={password} required onChange={(e) => {handlePasswordChange(e);}}/>
              <br />
              <br />
                <input className="input w-full max-h-10" type="password" placeholder="Confirm password" value={confPassword} required onChange={(e) => {handleConfPasswordChange(e);}}/>
              <br />

              <div>
                {errorMessage && (
                  <p className="alert alert-warning shadow-lg m-5 w-auto justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <b>{errorMessage}</b>
                  </p>
                )}
              </div>
              <button className="btn btn-success mt-6" type="submit" value="Sign-up">SignUp</button>
            </form>

          </div>
        </div>
      </header>
    </div>
  );
}
export default SignupComponent;
