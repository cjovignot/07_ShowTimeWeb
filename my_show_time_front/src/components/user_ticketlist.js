import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import QRCode from "react-qr-code";
import * as dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function user_ticket() {
  const [dataTicket, setdataTicket] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = Cookies.get("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:3000/ticket?id_user=" + user._id)
        .then((response) => {
          const sortedData = response.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setdataTicket(sortedData);
        })
        // .then((response) => setdataTicket(response.data))
        .then((response) => response)
        .catch((error) => console.error(error));
    }
  }, [user]);

  console.log(dataTicket);

  return (
    <div className="Ticketlistuser">
      <h1 className="text-3xl font-bold">MY TICKET LIST</h1>

      {dataTicket &&
        dataTicket.map((item, i) => (
          <div className="ticketuser">
            <div
              className="card card-compact w-200 bg-base-100 shadow-xl"
              key={i}
            >
              <div className="card-body">
                <QRCode
                  value={`/unit_concert?id=${item.id_concert}`}
                  size={150}
                />
              </div>
              <div className="ticketInfo">
                <div className="ticketTitle">
                  <h1 className="text-4xl font-bold"> {item.concertName}</h1>
                  <p className="badge"> {dayjs().to(dayjs(item.date))}</p>
                  <p>
                    {" "}
                    <b>{dayjs(item.date).format("ddd, D MMM, YYYY h:mm A")}</b>
                  </p>
                </div>
                <div className="text-2xl font-bold">
                  <p className="usernameticket">
                    {item.firstname} {item.lastname}
                  </p>
                </div>
                <div className="ticketLocation">
                  <p className="text-3xl font-bold">
                    Location: {item.location}
                  </p>
                  <p className="text-4xl font-bold"> {item.price} €</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default user_ticket;
