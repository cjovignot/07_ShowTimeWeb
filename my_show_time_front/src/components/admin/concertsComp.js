import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortBy from 'sort-by';

import Concert from './childConcertComp';

const handleDelete = async (itemId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/concerts/${itemId}`);
    // console.log(response.data);
    setItems(items.filter((item) => item._id !== itemId));
    // handle success response
  } catch (error) {
    console.error(error);
    // handle error response
  }
  window.location.reload(false);
};

function adminConcert() {
  const [dataConcert, setdataConcert] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:3000/concerts')
      .then(response => {
        const sortedData = response.data.sort((a, b) => new Date(a.concert_date) - new Date(b.concert_date));
        setdataConcert(sortedData);
      })
      .then((response) => response)
      .catch(error => console.error(error));
    }, []);

  console.log(dataConcert);

  return (
    <div class="admin_concert">
      <Link href="/admin"><button>Back</button></Link>
      <h1>CONCERTS MANAGER PAGE</h1>
        <table>
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
            {dataConcert && dataConcert.map((item, i) => (
              <Concert concert={ item } />
              ))
            }
        </table>
    </div>

  );
};
  
export default adminConcert;



// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const handleDelete = async (itemId) => {
//   try {
//     const response = await axios.delete(`http://localhost:3000/concerts/${itemId}`);
//     console.log(response.data);
//     setItems(items.filter((item) => item._id !== itemId));
//     // handle success response
//   } catch (error) {
//     console.error(error);
//     // handle error response
//   }
//   window.location.reload(false);
// };

// function adminConcert() {
//   const [dataConcert, setdataConcert] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:3000/concerts')
//       .then(response => setdataConcert(response.data))
//       .then((response) => response)
//       .catch(error => console.error(error));
//   }, []);
//   // console.log(data);
//   console.log(dataConcert);

//   return (
//     <div class="admin_concert">
//       <Link href="/admin"><button>Back</button></Link>
//       <h1>CONCERTS MANAGER PAGE</h1>
//         <table>
//             <thead>
//               <tr>
//                 <th><h3>CONCERT</h3></th>
//                 <th><h3>DATE</h3></th>
//                 <th><h3>LOCATION</h3></th>
//                 <th><h3>PRICE</h3></th>
//                 <th><h3>PLACES</h3></th>
//                 <th><h3>IMAGE</h3></th>
//               </tr>
//             </thead>
//             {dataConcert && dataConcert.map((item, i) => (
//               <tbody>
//                 <Link href={{ pathname: "/admin/concerts", query: { id: item._id } }}><td key={i}>{ item.name }</td></Link>
//                 <td key={i}>{ item.concert_date }</td>
//                 <td key={i}>{ item.location }</td>
//                 <td key={i}>{ item.price } €</td>
//                 <td key={i}>{ item.places_nbr }</td>
//                 <td key={i}>{ item.concert_img }</td>
//                 <td><button>EDIT</button></td>
//                 <td><button onClick={() => handleDelete( item._id )}>DELETE</button></td>
//               </tbody>
//               ))
//             }
//         </table>
//     </div>

//   );
// };
  
// export default adminConcert;
