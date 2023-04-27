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
