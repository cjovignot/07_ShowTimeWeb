import React, { useState, useEffect } from "react";
import axios from "axios";

function EditCategory(props) {
  const [name, setName] = useState(props.category.name);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/categories/${props.category._id}`,
        {
          name,
        }
      );
      props.onUpdate({ _id: props.category._id, name });
      props.onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-popup-wrapper">
      <div className="edit-popup">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Category Name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-success" type="submit">
            Save
          </button>
          <button
            className="btn btn-error"
            type="button"
            onClick={() => props.onClose()}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
