import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";
import { users } from "./Users.js";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
      // Fetch data using Axios when component mounts
      axios
        .get("http://localhost:8001/api/v1/threads")
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="list">
          {data.filter((data) => data.title.toLowerCase().includes(searchTerm)).map(
            (data) => {return (
              <li key={data.id}>{data.title}</li>
            )}
          )}
        </ul>
      </div>
    );

}
export default SearchBar;