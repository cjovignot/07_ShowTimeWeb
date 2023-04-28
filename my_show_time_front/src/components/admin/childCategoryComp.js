import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import concertCategory from './childConcertComp';


function categoryConcerts({ category }) {
  const [categoryConcerts, setCategoryConcerts] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/concerts?category_id=' + category._id)
    .then(response => setCategoryConcerts(response.data.length))
    .then((response) => response)
    .catch(error => console.error(error));
  }, [category._id]);
  
  console.log("catID", category._id)
  console.log("length", categoryConcerts);

  return (
    <tbody>
      <td><b>{ category.name }</b></td>
      <td>{ categoryConcerts }</td>
    </tbody>
  );
};
    
export default categoryConcerts;