import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import axios from 'axios';

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

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
  const [placeCount, setPlaceCount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
      .then(response => setCategoryName(response.data))
      .then((response) => response)
      .catch(error => console.error(error));
    }, [concert.category_id]);

  // console.log("NAME", categoryName);

  useEffect(() => {
    axios.get("http://localhost:3000/ticket?id_concert=" + concert._id)
    .then(response => setPlaceCount(response.data.length))
    .then((response) => response)
    .catch(error => console.error(error));
  }, [concert]);
    console.log("place count", placeCount)

  const remainingPlaces = concert.place_nbr - placeCount;

  return (
        <tbody>
          <td><Link href={{ pathname: "/admin/concerts", query: { id: concert._id } }}><b>{ concert.name }</b></Link></td>

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

          <td>{ dayjs().to(dayjs( concert.concert_date )) }</td>
          <td>{ dayjs(concert.concert_date).format('ddd, D MMM, YYYY h:mm A') }</td>
          <td>{ concert.location }</td>
          <td>{ concert.price } €</td>

          <td>{remainingPlaces}</td>

          <td><img src={concert.concert_img} width="100"/></td>
          <td><button>EDIT</button></td>
          <td><button onClick={() => handleDelete( concert._id )}>DELETE</button></td>
        </tbody>
  );
  
}
  
export default concertCategory;