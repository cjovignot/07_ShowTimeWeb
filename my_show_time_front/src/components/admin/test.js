import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Concert from './test';



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
      <div>
        {dataConcerts && dataConcerts.map((item, i) => (
          <Concert />
        ))}
      </div>
  );
};
  
export default admin_concerts;
  