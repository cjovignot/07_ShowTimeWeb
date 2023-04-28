import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import TicketBuy from "../components/BuyTicket";

function UnitConcert() {
  const router = useRouter();
  const [concert, setConcert] = useState({});
  const [placeCount, setPlaceCount] = useState(0);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    if (router.query.id) {
      axios
        .get("http://localhost:3000/concerts/" + router.query.id)
        .then((response) => setConcert(response.data))
        .catch((error) => console.error(error));
    }
  }, [router.query.id]);
  console.log(concert);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (concert._id) {
      axios
        .get("http://localhost:3000/ticket?id_concert=" + concert._id)
        .then((response) => setPlaceCount(response.data.length))
        .catch((error) => console.error(error));
    }
  }, [concert]);

  const updatePlaceCount = () => {
    axios
      .get("http://localhost:3000/ticket?id_concert=" + concert._id)
      .then((response) => setPlaceCount(response.data.length))
      .catch((error) => console.error(error));
  };

  if (!concert) {
    return <div>Not found</div>;
  }

  const remainingPlaces = concert.place_nbr - placeCount;

  return (
    <div>
      <div>
        <h1>{concert.name}</h1>
        <h3>{concert.artist_name}</h3>
        <img src={concert.concert_img} width={250} height={200} />
        {categories &&
          categories.map((item) => {
            if (item._id === concert.category_id) {
              return <p key={item._id}>Genre: {item.name}</p>;
            }
            return null;
          })}
        <p>Location: {concert.location}</p>
        <h3>Price: {concert.price}€</h3>
        {remainingPlaces > 0 ? (
          <h3>Remaining Places: {remainingPlaces}</h3>
        ) : (
          <h3 style={{ color: "red" }}>
            FULL / BOOKING IS NO LONGER AVAILABLE
          </h3>
        )}
      </div>

      {remainingPlaces > 0 && (
        <TicketBuy concert={concert} updatePlaceCount={updatePlaceCount} />
      )}
    </div>
  );
}

export default UnitConcert;
