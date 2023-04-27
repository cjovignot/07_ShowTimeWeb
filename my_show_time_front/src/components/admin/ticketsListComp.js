import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import * as dayjs from 'dayjs';

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

function ticketsList() {
    const router = useRouter();
    const [dataTicketsConcert, setTicketsConcert] = useState(null);
    const { id } = router.query;
    console.log(id)
    
    useEffect(() => {
      axios.get('http://localhost:3000/ticket?id_concert=' + id)
        .then(response => setTicketsConcert(response.data))
        .then((response) => response)
        .catch(error => console.error(error));
    }, []);
    console.log("tickets", dataTicketsConcert);
  

  return (
    <div class="admin_concert">
        This is the tickets list
        <table>

            <thead>
              <tr>
                <td><h3>CONCERT NAME</h3></td>
                <td><h3>F NAME</h3></td>
                <td><h3>L NAME</h3></td>
                <td><h3>DATE</h3></td>
                <td><h3>DATE</h3></td>
                <td><h3>LOCATION</h3></td>
                <td><h3>PRICE</h3></td>
              </tr>
            </thead>
            {dataTicketsConcert && dataTicketsConcert.map((item, i) => {
                return (
                <tr>
                    <td key={i}>{ item.concertName }</td>
                    <td>{ item.firstname }</td>
                    <td>{ item.lastname }</td>
                    <td>{ dayjs().to(dayjs( item.date )) }</td>
                    <td>{ dayjs(item.date).format('ddd, D MMM, YYYY h:mm A') }</td>
                    <td>{ item.location }</td>
                    <td>{ item.price }</td>
                </tr>
                )})}
        </table>
    </div>

  );
};
  
export default ticketsList;