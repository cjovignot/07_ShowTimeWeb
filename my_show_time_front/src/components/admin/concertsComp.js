import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SortBy from "sort-by";

import Concert from "./childConcertComp";
import CrudConcert from "./crudConcertComp";
import EditConcert from "./EditConcertComp";
function adminConcert() {
  const [dataConcert, setdataConcert] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [concertIdToEdit, setConcertIdToEdit] = useState(null);

  const handleDelete = async (itemId, setdataConcert) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/concerts/${itemId}`
      );

      setdataConcert((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (itemId) => {
    setConcertIdToEdit(itemId);
    setEditFormOpen(true);
  };

  const refreshConcertList = () => {
    axios
      .get("http://localhost:3000/concerts")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => new Date(b.concert_date) - new Date(a.concert_date)
        );
        setdataConcert(sortedData);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    refreshConcertList();
  }, []);

  const toggleForm = () => {
    setFormOpen(!formOpen);
  };

  return (
    <div className="admin_concert">
      <Link href="/admin">
        <button className="btn" id="back_button">
          Back
        </button>
      </Link>
      <h1 className="text-3xl font-bold">CONCERTS MANAGER PAGE</h1>
      <button className="btn btn-primary" onClick={toggleForm}>
        Add Concert
      </button>

      {formOpen && (
        <CrudConcert
          refreshConcertList={refreshConcertList}
          onClose={toggleForm}
        />
      )}

      {editFormOpen && (
        <EditConcert
          concertId={concertIdToEdit}
          refreshConcertList={refreshConcertList}
          onClose={() => setEditFormOpen(false)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="table w-full">
          {dataConcert &&
            dataConcert.map((item, i) => (
              <tr>
                <thead>
                  <tr>
                    <td><h3>CONCERT</h3></td>
                    <td><h3>GENRE</h3></td>
                    <td><h3>REMAINING TIME</h3></td>
                    <td><h3>DATE</h3></td>
                    <td><h3>LOCATION</h3></td>
                    <td><h3>PRICE</h3></td>
                    <td><h3>PLACES</h3></td>
                    <td><h3>IMAGE</h3></td>
                  </tr>
                </thead>

                <Concert concert={item} />
                <td>
                  <button className="btn btn-info" onClick={() => handleEdit(item._id)}>EDIT</button>
                  <button className="btn btn-outline btn-error" onClick={() => handleDelete(item._id, setdataConcert)}>DELETE</button>
                </td>
              </tr>
                
            ))}
        </table>
      </div>
    </div>
  );
}

export default adminConcert;
