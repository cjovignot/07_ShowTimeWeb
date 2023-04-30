import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import QRCode from "react-qr-code";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
        .catch((error) => console.error(error));
    }
  }, [user]);

  const isTicketPassed = (ticketDate) => {
    const currentDate = dayjs();
    const ticketDay = dayjs(ticketDate);
    const differenceInDays = ticketDay.diff(currentDate, "day");
    return differenceInDays < -1;
  };

  const ticketSections = {
    comingSoon: [],
    upcomingEvents: [],
    passed: [],
  };

  if (dataTicket) {
    dataTicket.forEach((item) => {
      const ticketDay = dayjs(item.date);
      const currentDate = dayjs();
      const differenceInDays = ticketDay.diff(currentDate, "day");

      if (differenceInDays <= 7 && differenceInDays > -1) {
        ticketSections.comingSoon.push(item);
      } else if (differenceInDays > 7) {
        ticketSections.upcomingEvents.push(item);
      } else {
        ticketSections.passed.push(item);
      }
    });
  }

  const renderTicket = (item, i) => {
    const ticketPassed = isTicketPassed(item.date);
    return (
      <div className="ticketuser" key={i}>
        <div
          className={`card card-compact w-200 bg-base-100 shadow-xl ${
            ticketPassed ? "bg-gray-300" : ""
          }`}
        >
          <div className="card-body">
            <QRCode value={`/unit_concert?id=${item.id_concert}`} size={150} />
          </div>
          <div className="ticketInfo">
            <div className="ticketTitle">
              <h1 className="text-4xl font-bold"> {item.concertName}</h1>

              <p>
                <span className="badge"> {dayjs().to(dayjs(item.date))}</span>
                <b>{dayjs(item.date).format("ddd, D MMM, YYYY h:mm A")}</b>
              </p>
            </div>
            {ticketPassed && (
              <div className="text-red-600 text-2xl font-bold">PASSED</div>
            )}
            <div className="text-2xl ">
              <p className="usernameticket">
                {item.firstname} {item.lastname}
              </p>
            </div>
            <div className="ticketLocation">
              <p className="text-3xl font-bold">Location: {item.location}</p>
              <p className="text-4xl font-bold"> {item.price} €</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Ticketlistuser">
      <h1 className="text-3xl font-bold text-white">MY TICKET LIST</h1>

      <h2 className="text-2xl font-bold my-4 text-white">Coming Soon</h2>
      {ticketSections.comingSoon.map((item, i) => renderTicket(item, i))}

      <h2 className="text-2xl font-bold my-4 text-white">Upcoming Events</h2>
      {ticketSections.upcomingEvents.map((item, i) => renderTicket(item, i))}

      <h2 className="text-2xl font-bold my-4 text-white">Passed</h2>
      {ticketSections.passed.map((item, i) => renderTicket(item, i))}
    </div>
  );
}

export default user_ticket;
