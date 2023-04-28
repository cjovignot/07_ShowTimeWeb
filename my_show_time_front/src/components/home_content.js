import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import InfoConcert from "./info_concert";


function AllConcerts() {
  const [dataConcerts, setDataConcerts] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios.get("http://localhost:3000/concerts");
  //     setDataConcerts(response.data);
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/concerts')
      .then(response => {
        const sortedData = response.data.sort((a, b) => new Date(b.concert_date) - new Date(a.concert_date));
        setDataConcerts(sortedData);
      })
      .then((response) => response)
      .catch(error => console.error(error));
    }, []);

  return (
    <div>
      <h1>List of concerts :</h1>
      <div class="product-container">
        {dataConcerts &&
          dataConcerts.map((item) => (
            <a key={item._id}>
              <Link
                href={{ pathname: "/unit_concert", query: { id: item._id } }}
              >
                {/*mon component info concert + son prop concert*/}
                <InfoConcert concert={item} />
              </Link>
            </a>
          ))}
      </div>
    </div>
  );
}

export default AllConcerts;
