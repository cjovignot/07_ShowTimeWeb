import React, { useState, useEffect } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import axios from "axios";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import { Cloudinary } from "cloudinary-core";

const cloudinaryInstance = new Cloudinary({ cloud_name: "dgarygsq5" });

function EditConcert(props) {
  const [name, setName] = useState("");
  const [artist_name, setArtistName] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [concert_date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [place_nbr, setPlaceNbr] = useState("");
  const [concert_img, setImage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Load the concert data
    axios
      .get(`http://localhost:3000/concerts/${props.concertId}`)
      .then((response) => {
        const concertData = response.data;
        setName(concertData.name);
        setArtistName(concertData.artist_name);
        setCategoryId(concertData.category_id);
        setLocation(concertData.location);
        setDate(new Date(concertData.concert_date));
        setPrice(concertData.price);
        setPlaceNbr(concertData.place_nbr);
        setImage(concertData.concert_img);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.concertId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/concerts/${props.concertId}`,
        {
          name,
          artist_name,
          category_id,
          location,
          concert_date,
          price,
          place_nbr,
          concert_img,
        }
      );
      props.refreshConcertList();
      props.onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "grobjvxj");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          cloudinaryInstance.config().cloud_name
        }/image/upload`,
        formData
      );
      setImage(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.response.data.error);
    }
  };

  return (
    <div className="edit-popup-wrapper">
      <div className="edit-popup">
        <div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <h1 className="text-3xl font-bold">EDIT</h1>
            <form className="admin_crud_concert" onSubmit={handleSubmit}>
              <input
                placeholder="Concert Name"
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="input input-bordered w-full max-w-xs"
              />

              <input
                placeholder="Artist Name"
                type="text"
                id="artist_name"
                value={artist_name}
                onChange={(event) => setArtistName(event.target.value)}
                className="input input-bordered w-full max-w-xs"
              />

              <select
                id="category_id"
                value={category_id}
                onChange={(event) => setCategoryId(event.target.value)}
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <input
                placeholder="Location"
                type="text"
                id="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="input input-bordered w-full max-w-xs"
              />

              <form fullWidth className="input input-bordered w-full max-w-xs">
                <Datetime
                  inputProps={{
                    placeholder: "Concert Date & Time",
                    id: "concert_date",
                    value: concert_date,
                  }}
                  onChange={(event) => {
                    setDate(new Date(event));
                  }}
                />
              </form>

              <input
                placeholder="Ticket Price"
                type="text"
                id="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="input input-bordered w-full max-w-xs"
              ></input>

              <input
                placeholder="Places"
                type="text"
                id="place_nbr"
                value={place_nbr}
                onChange={(event) => setPlaceNbr(event.target.value)}
                className="input input-bordered w-full max-w-xs"
              ></input>

              <input
                type="file"
                id="concert_img"
                accept="image/*"
                onChange={(event) => handleImageUpload(event)}
                className="input input-bordered w-full max-w-xs"
              />
              <button className="btn btn-success" type="submit">
                Save
              </button>
              <button
                className="btn btn-error"
                type="button"
                onClick={() => props.onClose()}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditConcert;
