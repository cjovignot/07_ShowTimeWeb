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
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-bold text-center mb-5">Genre Edition</h2>
            <form onSubmit={handleSubmit}>
              <input placeholder="Category Name" type="text" value={name} onChange={(event) => setName(event.target.value)} className="input input-bordered w-full max-w-xs"/>
              <div className="card-actions justify-between mt-5">
                <button className="btn btn-error w-20" type="button" onClick={() => props.onClose()}>Cancel</button>
                <button className="btn btn-success w-20" type="submit">Save</button>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
}

export default EditCategory;
