import React, { useState } from 'react';
import axios from 'axios';


function crudGenre() {

    const [name, setName] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/categories', {
          name,
        });
        console.log(response.data);
        // handle success response
      } catch (error) {
        console.error(error);
        // handle error response
      }
    window.location.reload(false);
    };

  return (
    <div className="admin_crud">
        <form className="admin_crud" onSubmit={handleSubmit}>
            <h1>CRUD GENRES</h1>
            <input
                placeholder="Genre Name"
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}>
            </input>
            <button type="submit">Save</button>
        </form>
    </div>
  );
};
  
export default crudGenre;