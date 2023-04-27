import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Category from './childCategoryComp';

const handleDelete = async (itemId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/categories/${itemId}`);
    // console.log(response.data);
    setItems(items.filter((item) => item._id !== itemId));

    // handle success response
  } catch (error) {
    console.error(error);
    // handle error response
  }
  window.location.reload(false);
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
    <div class="admin_concert">
      <Link href="/admin"><button>Back</button></Link>
      <h1>MUSIC GENRES MANAGER PAGE</h1>
      
      <table>
          <thead>
            <tr>
              <th><h3>MUSIC GENRES</h3></th>
              <th><h3>NBR CONCERTS</h3></th>
            </tr>
          </thead>
            {dataCategories && dataCategories.map((item, i) => (
              <Category category={ item }/>
              ))
            }
      </table>
    </div>

  );
}

export default adminCategories;