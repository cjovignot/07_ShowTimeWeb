import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import InfoConcert from "./info_concert";

function AllConcerts() {
  const [dataConcerts, setDataConcerts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3000/concerts");
      setDataConcerts(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>List of concerts :</h1>
      <div>
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
