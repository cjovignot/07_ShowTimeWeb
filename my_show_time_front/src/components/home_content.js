// const callAPI = async () => {
//     try {
//         const res = await fetch(
//             `localhost:3000/`,
//             {
//                 method: 'GET',
//                 headers: {
//                     'X-RapidAPI-Key': 'your-rapidapi-key',
//                     'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
//                 },
//             }
//         );
//         const data = await res.json();
//         console.log(data);
//     } catch (err) {
//         console.log(err);
//     }
// };


// function Page({ data }) {
//     // Render data...
//   }
  
//   // This gets called on every request
//   export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`lhttp://localhost:3000/concerts`)
//     const data = await res.json()
//     console.log(data);
  
//     // Pass data to the page via props
//     return { props: { data } }
//   }
  
//   export default Page


// import React from 'react'

// export const getStaticProps = async () => {

// 	// Fetching data from jsonplaceholder.
// 	const res = await fetch(
// 		'lhttp://localhost:3000/concerts');
// 	let allConcerts = await res.json();

// 	// Sending fetched data to the page component via props.
// 	return {
// 		props: {
// 			allConcerts: allConcerts.map((concerts) => concerts.name)
// 		}
// 	}
// }

// const Concerts = ({ allConcerts }) => {
// 	return (
// 		<div>
// 			<h1>All Albums</h1>
// 			{allConcerts.map((concerts, idx) => (
// 				<div key={idx}>{concerts}</div>))
// 			}
// 		</div>
// 	)
// }

// export default Concerts

import React from 'react'
import { useEffect, useState } from 'react'

export default function csr() {
    const [state, setState] = useState([]);
    async function getData() {
    const res = await fetch('https://fakestoreapi.com/products?');
    const data = await res.json();
    setState(data);
  }
  console.log('concerts:',state);
  useEffect(() => {
    getData();
  }, [])


  return (
    <div>
      <h1> Welcome to My blog gallery ssg</h1>
      <div>
      {
        state.map((e) => (
            <a key={e._id}>
            <h2> {e.title} &rarr;</h2>
            <img src={e.image} width={250} height={200}/>
            <p>{e.description}</p>
            <h3>${e.price}</h3>
        </a>
        ))
        }
      </div>
    </div>
  )
}

