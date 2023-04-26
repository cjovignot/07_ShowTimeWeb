import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



function admin_concerts() {
  const [dataConcerts, setDataConcerts] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/concerts')
      .then(response => setDataConcerts(response.data))
      .then((response) => response)
      .catch(error => console.error(error));
  }, []);
  console.log(dataConcerts);

  return (
    <section class="admin_concert">
      <h1>This is the Concerts Manager Page</h1>
      
      <div>
        {dataConcerts && dataConcerts.map((item, i) => (
          <Link href="/concerts/:id">
            <div class="unit_concert">
              <div key={i} class="left_side">
                <h2 key={i}>
                  { item.name }
                </h2>
                
                <h4 key={i}>
                  { item.concert_date }DATE
                </h4>
                
                <div key={i}>
                  { item.location }
                </div>
                
                <h3 key={i}>
                  { item.price } €
                </h3>

                <div key={i}>
                  Places left : { (item.place_nbr)-(1) }
                </div>
              </div>

                
                <img key={i} src={ item.concert_img }></img>
              
                <div class="admin_buttons">
                    {/* <button>EDIT</button> */}
                    <button>DELETE</button>
                </div>
            </div>
            
          </Link>
        ))}
      </div>
    </section>

  );
};
  
export default admin_concerts;
  