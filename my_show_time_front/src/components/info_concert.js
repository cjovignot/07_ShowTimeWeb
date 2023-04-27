import React, { useEffect, useState } from "react";
import axios from "axios";

function ConcertInfo({ concert }) {
  const [placeCount, setPlaceCount] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:3000/ticket?id_concert=" + concert._id
      );
      setPlaceCount(response.data.length);
      console.log(response.data);
    }
    fetchData();
  }, [concert._id]);

  const remainingPlaces = concert.place_nbr - placeCount;

  return (
    <div>
      <h2>{concert._id}</h2>
      <h1>{concert.name}</h1>
      <h2>{concert.artist_name}</h2>
      <img src={concert.concert_img} width={250} height={200} />
      <p>Location: {concert.location}</p>
      {placeCount !== null && (
        <h3>
          Place count: {placeCount} (Remaining places: {remainingPlaces})
        </h3>
      )}
      <h3>Price: {concert.price}€</h3>
    </div>
  );
}

export default ConcertInfo;
