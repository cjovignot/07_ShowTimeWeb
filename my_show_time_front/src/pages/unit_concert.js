import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import TicketBuy from "../components/BuyTicket";
import * as dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

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
      <div className="unitconcertuser">
        <img src={concert.concert_img} width={250} height={200} />
        <div className="unitconcertinfo">
          <h1 className="text-9xl font-bold">{concert.name}</h1>
          <h3 className="text-8xl font-bold">{concert.artist_name}</h3>
          <div className="unitconcertdetail">
            {categories &&
              categories.map((item) => {
                if (item._id === concert.category_id) {
                  return <p key={item._id}>Genre: {item.name}</p>;
                }
                return null;
              })}
            <p>Location: {concert.location}</p>
            <p>{dayjs().to(dayjs(concert.concert_date))}</p>
            <p>
              {" "}
              {dayjs(concert.concert_date).format("ddd, D MMM, YYYY h:mm A")}
            </p>
            <h3>Price: {concert.price}€</h3>
          </div>
        </div>
      </div>
      <div>
        {remainingPlaces > 0 ? (
          <h3>Remaining Places: {remainingPlaces}</h3>
        ) : (
          <h3 style={{ color: "red" }}>
            FULL / BOOKING IS NO LONGER AVAILABLE
          </h3>
        )}

        {remainingPlaces > 0 && (
          <TicketBuy concert={concert} updatePlaceCount={updatePlaceCount} />
        )}
      </div>
    </div>
  );
}

export default UnitConcert;
