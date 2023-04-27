import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import concertCategory from './childConcertComp';

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

function categoryConcerts({ category }) {
  const [categoryConcerts, setCategoryConcerts] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/concerts?category_id=' + category._id)
      .then(response => setCategoryConcerts(response.data.length))
      .then((response) => response)
      .catch(error => console.error(error));
    }, [category._id]);

  console.log("NAME", categoryConcerts);

  return (
    <tbody>
      <td><b>{ category.name }</b></td>
      <td>{ categoryConcerts }</td>
      <td><button>EDIT</button></td>
      <td><button onClick={() => handleDelete(item._id)}>DELETE</button></td>
    </tbody>
  );
};
  
export default categoryConcerts;