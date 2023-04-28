import Link from "next/link";
import React, { useState, useEffect } from "react";
import * as dayjs from "dayjs";
import axios from "axios";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function concertCategory({ concert, handleDelete }) {
  const [categoryName, setCategoryName] = useState(null);
  const [placeCount, setPlaceCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCategoryName(response.data))
      .then((response) => response)
      .catch((error) => console.error(error));
  }, [concert.category_id]);

  useEffect(() => {
    const url = "http://localhost:3000/ticket?id_concert=" + concert._id;
    console.log("place count", url);
    axios
      .get(url)
      .then((response) => {
        console.log("tickets response data", response.data); // Log the response data
        setPlaceCount(response.data.length);
      })
      .then((response) => response)
      .catch((error) => console.error(error));
  }, [concert]);

  const remainingPlaces = concert.place_nbr - placeCount;

  return (
    <tbody>
      <td>
        <Link
          href={{ pathname: "/admin/concert/", query: { id: concert._id } }}
        >
          <b>{concert.name}</b>
        </Link>
      </td>

      {categoryName &&
        categoryName.map((item, i) => {
          if (item._id === concert.category_id) {
            // console.log("matched item:", item)
            return <td key={i}>{item.name}</td>;
          }
          return null;
        })}

      <td>{dayjs().to(dayjs(concert.concert_date))}</td>
      <td>{dayjs(concert.concert_date).format("ddd, D MMM, YYYY h:mm A")}</td>
      <td>{concert.location}</td>
      <td>{concert.price} €</td>
      <td>{remainingPlaces}</td>

      <td>
        <img src={concert.concert_img} width="100" />
      </td>
      <td>
        <button>EDIT</button>
      </td>
      <td>
        <button onClick={() => handleDelete(concert._id)}>DELETE</button>
      </td>
    </tbody>
  );
}

export default concertCategory;
