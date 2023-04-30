import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

function adminInfos() {
  const [dataCategories, setDataCategories] = useState(null);
  const [dataConcerts, setDataConcerts] = useState(null);
  const [dataUsers, setDataUsers] = useState(null);
  const [dataAdmins, setDataAdmins] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setDataCategories(response.data.length))
      .then((response) => response)
      .catch((error) => console.error(error));
  }, []);
  console.log(dataCategories);

  useEffect(() => {
    axios
      .get("http://localhost:3000/concerts")
      .then((response) => setDataConcerts(response.data.length))
      .then((response) => response)
      .catch((error) => console.error(error));
  }, []);
  console.log(dataConcerts);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => setDataUsers(response.data.length))
      .then((response) => response)
      .catch((error) => console.error(error));
  }, []);
  // console.log(dataUsers);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/?isAdmin=true")
      .then((response) => setDataAdmins(response.data.length))
      .then((response) => response)
      .catch((error) => console.error(error));
  }, []);
  console.log(dataAdmins);

  return (
    <div className="admin_infos">
      <h1 className="text-3xl font-bold text-white">ADMINISTRATOR PANEL</h1>
      <table>
        <thead>
          <tr>
            <th>
              <Link href="/admin/categories/">
                <button className="btn btn-wide">
                  {dataCategories} GENRES
                </button>
              </Link>
            </th>
            <th>
              <Link href="/admin/concerts/">
                <button className="btn btn-wide">
                  {dataConcerts} CONCERTS
                </button>
              </Link>
            </th>
            <th>
              <Link href="/admin/users/">
                <button className="btn btn-wide">
                  {dataUsers} USERS/ADMINS
                </button>
              </Link>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default adminInfos;
