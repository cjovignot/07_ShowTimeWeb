import React, { useState } from 'react';
import Datetime from "react-datetime";
import axios from 'axios';

function crudConcert() {

  const [name, setName] = useState('');
  const [artist_name, setArtistName] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [location, setLocation] = useState('');
  const [concert_date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [place_nbr, setPlaceNbr] = useState('');
  const [concert_img, setImage] = useState('');
  // const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/concerts', {
        name,
        artist_name,
        category_id,
        location,
        concert_date,
        price,
        place_nbr,
        concert_img,
      });
      console.log(response.data);
      
      // handle success response
    } catch (error) {
      console.error(error);
      // handle error response
    }
    window.location.reload(false);
  };



// function crudConcert() {
//   const [dataConcert, setdataConcert] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:3000/concerts')
//       .then(response => setdataConcert(response.data))
//       .then((response) => response)
//       .catch(error => console.error(error));
//   }, []);
//   // console.log(data);
//   console.log(dataConcert);

  return (
    <div class="admin_crud">
        <form class="admin_crud" onSubmit={handleSubmit}>
            <h1>CRUD CONCERT</h1>
            <input placeholder="Concert Name"
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}></input>

            <input placeholder="Artist Name"
              type="text"
              id="artist_name"
              value={artist_name}
              onChange={(event) => setArtistName(event.target.value)}></input>

              <input placeholder="CategoryId"
                type="text"
                id="category_id"
                value={category_id}
                onChange={(event) => setCategoryId(event.target.value)}></input>

            <input placeholder="Location"
              type="text"
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}></input>

            <input placeholder="Concert Date"
              type="text"
              id="concert_date"
              value={concert_date}
              onChange={(event) => setDate(event.target.value)}></input>



            <div>
              <br />
              <form fullWidth>
                <Datetime
                  inputProps={{ placeholder: "Concert Date & Time" }}
                />
              </form>
            </div>
            

            <input placeholder="Ticket Price"
              type="text"
              id="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}></input>

            <input placeholder="Places"
              type="text"
              id="place_nbr"
              value={place_nbr}
              onChange={(event) => setPlaceNbr(event.target.value)}></input>

            <input placeholder="Concert image"
              type="text"
              id="concert_img"
              value={concert_img}
              onChange={(event) => setImage(event.target.value)}></input>
            <button type="submit">Save</button>
        </form>
    </div>

  );
};
  
export default crudConcert;