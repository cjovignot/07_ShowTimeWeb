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
        .then((response) => setdataTicket(response.data))
        .then((response) => response)
        .catch((error) => console.error(error));
    }
  }, [user]);

  console.log(dataTicket);

  return (
    <div>
      <h1>MY TICKET LIST PAGE for {user ? user.firstname : "User"}</h1>

      {dataTicket &&
        dataTicket.map((item, i) => (
          <div key={i}>
            <div>
              <QRCode
                value={`/unit_concert?id=${item.id_concert}`}
                size={150}
              />
              Concert name: {item.concertName}
              {dayjs().to(dayjs(item.date))}
              {dayjs(item.date).format("ddd, D MMM, YYYY h:mm A")}
              Firstname: {item.firstname}
              Lastname: {item.lastname}
              Location: {item.location}
              Price: {item.price}
            </div>
          </div>
        ))}
    </div>
  );
}

export default user_ticket;
