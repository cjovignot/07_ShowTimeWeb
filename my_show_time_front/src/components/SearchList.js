// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const SearchResults = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const value = router.query;
//     if (value) {
//       setSearchQuery(value);
//       search(value);
//     }
//   }, [router.query]);

//   const search = async (query) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/concerts/?artist_name=${query}`);
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Search Results for "{searchQuery}"</h1>
//       {searchResults.length > 0 ? (
//         <ul>
//           {searchResults.map((result) => (
//             <li key={result._id}>
//               <p>{result.name}</p>
//               <p>{result.artist_name}</p>
//               <p>{result.location}</p>
//               <p>{result.price}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No results found for "{searchQuery}"</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;





// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const SearchResults = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchBy, setSearchBy] = useState("artist_name");

//   useEffect(() => {
//     const query = router.query[searchBy];
//     if (query) {
//       setSearchQuery(query);
//       search(query);
//     }
//   }, [router.query, searchBy]);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchByChange = (e) => {
//     setSearchBy(e.target.value);
//   };

//   const search = async (query) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/concerts/?${searchBy}=${query}`
//       );
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Search Results for "{searchQuery}"</h1>
//       <form onSubmit={(e) => {
//         e.preventDefault();
//         search(searchQuery);
//       }}>
//         <input type="text" value={searchQuery} onChange={handleSearchChange} />
//         <select value={searchBy} onChange={handleSearchByChange}>
//           <option value="artist_name">Artist Name</option>
//           <option value="name">Name</option>
//           <option value="location">Location</option>
//         </select>
//         <button type="submit">Search</button>
//       </form>
//       {searchResults.length > 0 ? (
//         <ul>
//           {searchResults.map((result) => (
//             <li key={result._id}>
//               <p>{result.name}</p>
//               <p>{result.artist_name}</p>
//               <p>{result.location}</p>
//               <p>{result.price}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No results found for "{searchQuery}"</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;




// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const SearchResults = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const artistName = router.query.artist_name;
//     if (artistName) {
//       setSearchQuery(artistName);
//       search(artistName);
//     }
//   }, [router.query]);

//   const search = async (query) => {
//   try {
//     let url = `http://localhost:3000/concerts/`;

//     // Check if search query contains artist name
//     if (query.artist_name) {
//       url += `?artist_name=${query.artist_name}`;
//     }

//     // Check if search query contains location
//     if (query.location) {
//       url += url.includes('?') ? `&location=${query.location}` : `?location=${query.location}`;
//     }

//     // Check if search query contains name
//     if (query.name) {
//       url += url.includes('?') ? `&name=${query.name}` : `?name=${query.name}`;
//     }

//     const response = await axios.get(url);
//     setSearchResults(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };


//   return (
//     <div>
//       <h1>Search Results for "{searchQuery}"</h1>
//       {searchResults.length > 0 ? (
//         <ul>
//           {searchResults.map((result) => (
//             <li key={result._id}>
//               <p>{result.name}</p>
//               <p>{result.artist_name}</p>
//               <p>{result.location}</p>
//               <p>{result.price}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No results found for "{searchQuery}"</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;


// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const SearchResults = () => {
//   const router = useRouter();
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const searchQuery = router.query.search;
//     if (searchQuery) {
//       search(searchQuery);
//     }
//   }, [router.query.search]);

//   const search = async (query) => {
//     try {
//       let url = `http://localhost:3000/concerts/?search=${query}`;

//       const response = await axios.get(url);
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Search Results for "{router.query.search}"</h1>
//       {searchResults.length > 0 ? (
//         <ul>
//           {searchResults.map((result) => (
//             <li key={result._id}>
//               <p>{result.name}</p>
//               <p>{result.artist_name}</p>
//               <p>{result.location}</p>
//               <p>{result.price}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No results found for "{router.query.search}"</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;


// ! BASEEEE

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchResults = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const artistName = router.query.artist_name;
    if (artistName) {
      setSearchQuery(artistName);
      search(artistName);
    }
  }, [router.query]);

  const search = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/concerts/?word=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result._id}>
              <p>{result.name}</p>
              <p>{result.artist_name}</p>
              <p>{result.location}</p>
              <p>{result.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{searchQuery}"</p>
      )}
    </div>
  );
};

export default SearchResults;
