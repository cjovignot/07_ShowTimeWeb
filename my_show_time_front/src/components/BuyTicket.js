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
  console.log(concert);

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
          date: concert.concert_date,
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
      setMessage(
      <div className="mt-5">
        <h3 className="text-2xl font-bold text-cyan-600 text-center">{purchasedTickets.length} Purchased Tickets</h3>
        <h3 className="text-xl font-bold text-cyan-600 text-center">Thanks !</h3>
      </div>);
      setTicketCount(0);
      setFormsData([]);
      props.updatePlaceCount();
    } catch (error) {
      setMessage("Error submitting the form.");
      console.error(error);
    }
  };

  const totalPrice = concert.price * ticketCount;

  return (
    <div className="buy_ticket">
      <h2 className="text-3xl font-bold text-white">Buy a ticket</h2>
      {message && <p>{message}</p>}
      <div className="text-sm font-bold">Select how many tickets would you like to buy?</div>

      <div className="nbr_tickets_buttons mt-5">
        <button className="btn btn-xs btn-circle" onClick={decrementTickets}>-</button>
        <span> {ticketCount} </span>
        <button className="btn btn-xs btn-circle" onClick={incrementTickets}>+</button>
      </div>

      {formsData.map((form, index) => (
        <div key={index}>
          <h4 className="text-2xl font-bold">Ticket {index + 1}</h4>
          <input className="input input-bordered input-info w-full input-md mb-2" type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={(e) => handleChange(e, index)} />
          <input className="input input-bordered input-info w-full input-md mb-2" type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={(e) => handleChange(e, index)} />
        </div>
      ))}
      {ticketCount > 0 && (
        <>
          <span> Total price is: {totalPrice}€</span>
          <button className="btn btn-success m-5" onClick={handleSubmit}>Confirm</button>
        </>
      )}
    </div>
  );
}

export default BuyTicket;
