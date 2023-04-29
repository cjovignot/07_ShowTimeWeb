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
    <div className="unit_concert_vignette">

      <div className="card card-side bg-base-100 shadow-xl">
        <img src={concert.concert_img}/>

        <div className="card-body">
          <h2 className="text-3xl font-bold">{concert.name}</h2>
          <h2 className="text-l font-bold">{concert.artist_name}</h2>
          <p>
            {categories &&
              categories.map((item) => {
                if (item._id === concert.category_id) {
                  return <p key={item._id}>Genre: {item.name}</p>;
                }
                return null;
              })}
          </p>
          <p className="text-l font-bold">Location: {concert.location}</p>
          <p>{dayjs().to(dayjs(concert.concert_date))}</p>
          <p>{dayjs(concert.concert_date).format("ddd, D MMM, YYYY h:mm A")}
          </p>
          <h3 className="text-l font-bold">Price: {concert.price}€</h3>

          
          <div>
            {remainingPlaces > 0 ? (
              <h3 className="text-orange-500 font-bold">Remaining Places: {remainingPlaces}</h3>
            ) : (
              <h3 style={{ color: "red" }}>
                FULL / BOOKING IS NO LONGER AVAILABLE
              </h3>
            )}
            </div>

          <div className="card-actions justify-center">
            <label htmlFor="my-modal-6" className="btn">BUY</label>
            {/* <button href="#my-modal-2" className="btn btn-primary">BUY</button> */}
          </div>


          <input type="checkbox" id="my-modal-6" className="modal-toggle" />
          
          <div className="modal modal-bottom sm:modal-middle">
            
            <div className="modal-box">
              
              {remainingPlaces > 0 && (
                <TicketBuy concert={concert} updatePlaceCount={updatePlaceCount} />
              )}
              <div className="modal-action mt-10 justify-center">
                <label htmlFor="my-modal-6" className="btn">CANCEL</label>
              </div>
            </div>
          </div>

        </div>
      </div>

      </div>
  );
}

export default UnitConcert;
