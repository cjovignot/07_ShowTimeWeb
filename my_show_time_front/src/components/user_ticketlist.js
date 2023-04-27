import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
    <div class="admin_concert">
      <Link href="/admin">
        <button>Back</button>
      </Link>

      <h1>MY TICKET LIST PAGE for {user ? user.firstname : "User"}</h1>

      {dataTicket &&
        dataTicket.map((item, i) => (
          <div key={i}>
            <div>
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
