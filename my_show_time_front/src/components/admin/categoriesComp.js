import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Category from './childCategoryComp';

const handleDelete = async (itemId, setDataCategories) => {
  try {
    const response = await axios.delete(`http://localhost:3000/categories/${itemId}`);
    // console.log(response.data);
    
    // setTicketsConcert(prevTickets => prevTickets.filter(item => item._id !== itemId));
    setDataCategories(prevItems => prevItems.filter((item) => item._id !== itemId));

    // handle success response
  } catch (error) {
    console.error(error);
    // handle error response
  }
};

function adminCategories() {
  const [dataCategories, setDataCategories] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
    .then(response => setDataCategories(response.data))
    .then((response) => response)
    .catch(error => console.error(error));
  }, []);
      // console.log(dataCategories);

  return (
    <div className="admin_genres">
      <Link href="/admin"><button className="btn">Back</button></Link>
      <h1 className="text-3xl font-bold">MUSIC GENRES MANAGER PAGE</h1>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
              {dataCategories && dataCategories.map((item, i) => (
                <tr>
                  <thead>
                    <tr>
                      <th><h3>MUSIC GENRE</h3></th>
                      <th><h3>NBR CONCERTS</h3></th>
                    </tr>
                  </thead>
                  <Category category={ item }/>
                  <td>
                    <button className="btn btn-info">EDIT</button>
                    <button className="btn btn-outline btn-error" onClick={() => handleDelete(item._id, setDataCategories)}>DELETE</button>
                  </td>
                </tr>
                ))
              }
        </table>
      </div>
    </div>

  );
}

export default adminCategories;