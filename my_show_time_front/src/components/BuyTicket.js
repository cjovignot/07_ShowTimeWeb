import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import QRCode from "react-qr-code";

function BuyTicket(props) {
  const [ticketCount, setTicketCount] = useState(0);
  const [formsData, setFormsData] = useState([]);
  const [message, setMessage] = useState("");
  const [purchasedTickets, setPurchasedTickets] = useState([]);

  const [user, setUser] = useState(null);
  const { concert } = props;

  useEffect(() => {
    const storedUser = Cookie.get("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const incrementTickets = () => {
    setTicketCount(ticketCount + 1);
    setFormsData([...formsData, { firstName: "", lastName: "" }]);
  };

  const decrementTickets = () => {
    if (ticketCount > 0) {
      setTicketCount(ticketCount - 1);
      setFormsData(formsData.slice(0, -1));
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormsData = [...formsData];
    newFormsData[index][name] = value;
    setFormsData(newFormsData);
  };

  const handleSubmit = async () => {
    const unfilledForms = formsData.filter(
      (form) => form.firstName === "" || form.lastName === ""
    );
    if (unfilledForms.length > 0) {
      setMessage(
        "You must fill all ticket information or reduce the number of tickets you want to buy."
      );
      return;
    }

    const userId = user && user._id;

    try {
      const responsePromises = formsData.map((form) => {
        const postData = {
          firstname: form.firstName,
          lastname: form.lastName,
          id_concert: concert._id,
          concertName: concert.name,
          date: "2023-02-03", // NEED TO GET THE VARIABLE ONCE IT IS SET IN CONCERT CREATION
          location: concert.location,
          price: concert.price,
          id_user: userId,
        };

        console.log("Data to be sent in the fetch request:", postData);
        return axios.post("http://localhost:3000/ticket/", postData);
      });

      const responses = await Promise.all(responsePromises);
      const purchasedTickets = responses.map((response) => response.data);
      setPurchasedTickets(purchasedTickets);
      setMessage(`Congrats, you bought ${ticketCount} number of tickets!`);
      setTicketCount(0);
      setFormsData([]);
    } catch (error) {
      setMessage("Error submitting the form.");
      console.error(error);
    }
  };

  const totalPrice = concert.price * ticketCount;

  return (
    <div>
      <h2>Buy a ticket</h2>
      {message && <p>{message}</p>}
      <p>Select how many tickets would you like to buy?</p>
      <button onClick={decrementTickets}>-</button>
      <span>{ticketCount}</span>
      <button onClick={incrementTickets}>+</button>
      {formsData.map((form, index) => (
        <div key={index}>
          <h4>Ticket {index + 1}</h4>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
      {ticketCount > 0 && (
        <>
          <button onClick={handleSubmit}>Confirm</button>
          <span> Total price is: {totalPrice}€</span>
        </>
      )}

      {purchasedTickets.length > 0 && (
        <div>
          <h3>Purchased Tickets</h3>
          {purchasedTickets.map((ticket, index) => (
            <div key={index}>
              <h4>Ticket {index + 1}</h4>
              <QRCode
                value={`/unit_concert?id=${ticket.id_concert}`}
                size={150}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuyTicket;
