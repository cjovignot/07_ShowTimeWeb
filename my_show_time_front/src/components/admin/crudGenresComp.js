import React, { useState } from 'react';
import axios from 'axios';

function crudGenre() {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/categories', {
        name,
      });

      const newCategory = response.data;
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      console.log(newCategory);
      // handle success response
    } catch (error) {
      console.error(error);
      // handle error response
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
                className="input input-bordered w-full max-w-xs">
            </input>
            <button className="btn btn-success" type="submit">Save</button>
        </form>
    </div>
  );
};
  
export default crudGenre;