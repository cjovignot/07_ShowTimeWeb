import axios from 'axios'
import allConcerts from './home_content'

export async function getStaticProps() {
  const response = await axios.get('http://localhost:3000/concerts');
  const dataConcerts = response.data;
  return {
    props: { dataConcerts },
  };
}


// import React from 'react'
// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import Link from 'next/link'


// function allConcerts() {
//   const [dataConcerts, setDataConcerts] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:3000/concerts')
//       .then(response => setDataConcerts(response.data))
//       .catch(error => console.error(error));
//   }, []);
//   console.log(dataConcerts)


//   return (
//     <div>
//       <ticketconcert />
//       <h1>List of concerts :</h1>
//       <div>
//       {
//         dataConcerts &&
//         dataConcerts.map((item, i) => (
//           <a key={ item._id }>
//             <Link
//               href={{
//                 pathname: '/unit_concert',
//                 query: { id: item._id },
//               }}
//             >
//               <h2 className = "home-link">{ item.name } &rarr;</h2>
//             </Link>
//             <h3>{item.artist_name}</h3>
//             <img src={item.concert_img} width={250} height={200}/>
//             <p>Location: {item.location}</p>
//             <h3>Price: {item.price}€</h3>
//           </a>
//         ))
//         }
//       </div>
//     </div>
//   )
// }

// export default allConcerts;
