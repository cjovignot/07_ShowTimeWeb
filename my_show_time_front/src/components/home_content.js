import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'


function allConcerts() {
  const [dataConcerts, setDataConcerts] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/concerts')
      .then(response => setDataConcerts(response.data))
      // .then((response) => response.JSON.parse())
      .catch(error => console.error(error));
  }, []);
  console.log(dataConcerts)


  return (
    <div>
      <ticketconcert />
      <h1>List of concerts :</h1>
      <div>
      {
        dataConcerts &&
        dataConcerts.map((item, i) => (
          <a key={ item._id }>
            <Link
              href={{
                pathname: '/unit_concert',
                query: { id: item._id },
              }}
            >
              <h2 className = "home-link">{ item.name } &rarr;</h2>
            </Link>
            <h3>{item.artist_name}</h3>
            <img src={item.concert_img} width={250} height={200}/>
            <p>Location: {item.location}</p>
            <h3>Price: {item.price}€</h3>
          </a>
        ))
        }
      </div>
    </div>
  )
}

export default allConcerts;

// export default function csr() {
//     const [state, setState] = useState([]);
//     async function getData() {
//     const res = await fetch('http://localhost:3000/concerts');
//     const data = await res.json();
//     setState(data);
//   }
//   console.log('concerts:',state);
//   useEffect(() => {
//     getData();
//   }, [])


//   return (
//     <div>
//       <h1>List of concerts :</h1>
//       <div>
//       {
//         state.map((e) => (
//             <a key={e._id}>
//             <h2>{e.name} &rarr;</h2>
//             <h3>{e.artist_name}</h3>
//             <img src={e.concert_img} width={250} height={200}/>
//             <p>{e.location}</p>
//             <h3>{e.price}</h3>
//         </a>
//         ))
//         }
//       </div>
//     </div>
//   )
// }