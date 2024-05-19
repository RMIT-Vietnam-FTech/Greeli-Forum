import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // Fetch data using Axios when component mounts
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const result = response.data.filter((data) =>
          data.title.toLowerCase().includes(searchTerm)
        );
        console.log(result);
        setSearchResult(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchTerm]);

  return (
    //  <div className="container h-100">
    //   <div className="d-flex justify-content-center h-100">
    //     <div className="search">
    //       <input 
    //         className="search_input" 
    //         type="search" 
    //         placeholder="Search here..."
    //         onChange={(e) => setSearchTerm(e.target.value)} 
    //         />
    //       <FaSearch />
    //     </div>
    //     <div className="result">
    //         <ul>
    //           {result.filter((result) => result.title.toLowerCase().includes(searchTerm)).map(
    //             (result) => {return (
    //               <Link to="/forum" key={result.id}>
    //                 <li>{result.title}</li>
    //               </Link>
    //             )}
    //           )}
    //         </ul>
    //     </div>
    //   </div>
    // </div>
    <div className="py-5">
      <div className="input-wrapper d-block rounded-pill bg-light ">
        <input 
            className="search_input border-0 bg-transparent" 
            type="search" 
            placeholder="Search here..."
            onChange={(e) => setSearchTerm(e.target.value)} 
            />
          <FaSearch className="text-primary-green"/>
      </div>
      <div className="result-list">
        { searchResult.map((result) => {
          return (
            <Link to="/forum" key={result.id} className="d-block">
              <p>{result.title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  );
} 

export default SearchBar;