import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Category from "./childCategoryComp";
import CrudGenre from "./crudGenresComp";

const handleDelete = async (itemId, setDataCategories) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/categories/${itemId}`
    );
    setDataCategories((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );
  } catch (error) {
    console.error(error);
  }
};

function adminCategories() {
  const [dataCategories, setDataCategories] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      setDataCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin_genres">
      <Link href="/admin">
        <button className="btn">Back</button>
      </Link>
      <h1 className="text-3xl font-bold">MUSIC GENRES MANAGER PAGE</h1>

      <button
        className="btn btn-primary"
        onClick={() => setShowForm((prevShowForm) => !prevShowForm)}
      >
        {showForm ? "Close form" : "Create a new category"}
      </button>

      {showForm && (
        <CrudGenre
          onCreate={(newCategory) => {
            setDataCategories((prevCategories) => [
              ...prevCategories,
              newCategory,
            ]);
            setShowForm(false);
          }}
        />
      )}

      <div className="overflow-x-auto mt-10">
        <table className="table w-full">
          {dataCategories &&
            dataCategories.map((item, i) => (
              <tr>
                <thead>
                  <tr>
                    <th>
                      <h3>MUSIC GENRE</h3>
                    </th>
                    <th>
                      <h3>NBR CONCERTS</h3>
                    </th>
                  </tr>
                </thead>
                <Category category={item} />
                <td>
                  <button className="btn btn-info ml-5">EDIT</button>
                  <button
                    className="btn btn-outline btn-error ml-5"
                    onClick={() => handleDelete(item._id, setDataCategories)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default adminCategories;
