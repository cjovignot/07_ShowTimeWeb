import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function admin_categories() {
  const [dataCategories, setDataCategories] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
    .then(response => setDataCategories(response.data))
    .then((response) => response)
    .catch(error => console.error(error));
  }, []);
      console.log(dataCategories);

  return (
    <section class="admin_infos">
      <h1>This is the Categories Manager Page</h1>
      
      <div>
        {dataCategories &&
          dataCategories.map((item, i) => (
            <div key={i}>
              <div>
                { item.name }
              </div>

              <div key={i}>
                { item.count_concert }
              </div>
            </div>
          ))
        }
      </div>
    </section>

  );
}

export default admin_categories;
  