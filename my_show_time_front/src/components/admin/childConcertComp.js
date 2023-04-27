import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const handleDelete = async (itemId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/concerts/${itemId}`);
    // console.log(response.data);
    setItems(items.filter((item) => item._id !== itemId));
    // handle success response
  } catch (error) {
    console.error(error);
    // handle error response
  }
  window.location.reload(false);
};

function concertCategory({ concert }) {
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
      .then(response => setCategoryName(response.data))
      .then((response) => response)
      .catch(error => console.error(error));
    }, [concert.category_id]);

  // console.log("NAME", categoryName);

  return (
        <tbody>
          <Link href={{ pathname: "/admin/concerts", query: { id: concert._id } }}><td><b>{ concert.name }</b></td></Link>

            {categoryName && categoryName.map((item, i) => {
              if (item._id === concert.category_id) {
                // console.log("matched item:", item)
                return (
                  <td key={i}>
                    {item.name}
                  </td>
                );
              }
              return null;
            })}

          <td>{ concert.concert_date }</td>
          <td>{ concert.location }</td>
          <td>{ concert.price } €</td>
          <td>{ concert.places_nbr }</td>
          <td>{ concert.concert_img }</td>
          <td><button>EDIT</button></td>
          <td><button onClick={() => handleDelete( item._id )}>DELETE</button></td>
        </tbody>
  );
};
  
export default concertCategory;