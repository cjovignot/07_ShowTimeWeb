import React, { useEffect, useState } from "react";
import axios from "axios";
import * as dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function ConcertInfo({ concert }) {
  const [placeCount, setPlaceCount] = useState(null);
  const [categories, setCategories] = useState(null);

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

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);

  const remainingPlaces = concert.place_nbr - placeCount;

  return (
    <div>
      <h1>{concert.name}</h1>
      <h2>{concert.artist_name}</h2>
      <img src={concert.concert_img} width={250} height={200} />
      <p>Location: {concert.location}</p>
      <p>{dayjs().to(dayjs(concert.concert_date))}</p>
      <p>{dayjs(concert.concert_date).format("ddd, D MMM, YYYY h:mm A")}</p>
      {categories &&
        categories.map((item) => {
          if (item._id === concert.category_id) {
            return <p key={item._id}>Genre: {item.name}</p>;
          }
          return null;
        })}
      {placeCount !== null && <h3>Remaining places: {remainingPlaces}</h3>}
      <h3>Price: {concert.price}€</h3>
    </div>
  );
}

export default ConcertInfo;
