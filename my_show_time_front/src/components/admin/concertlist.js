import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Concert from './concertlist';



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
            <Concert />            
          </Link>
        ))}
      </div>
    </section>

  );
};
  
export default admin_concerts;
  