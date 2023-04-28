import React, { useState } from "react";
import axios from "axios";

function CrudGenre({ onCreate }) {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/categories", {
        name,
      });

      const newCategory = response.data;
      onCreate(newCategory);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin_crud">
      <form className="admin_crud" onSubmit={handleSubmit}>
        <input
          placeholder="Genre Name"
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="input input-bordered w-full max-w-xs"
        ></input>
        <button className="btn btn-success" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default CrudGenre;
