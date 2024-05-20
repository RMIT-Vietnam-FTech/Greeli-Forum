import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchBar.css";
import { useUserContext } from "../../context/UserContext";

function SearchBar() {
  const { searchTerm, setSearchTerm} = useUserContext();
  // const [searchResult, setSearchResult] = useState([]);
  return (
    <div className="py-5">
      <div className="input-wrapper d-block rounded-pill border border-primary-green ">
        <input 
            className="search_input border-0 bg-transparent" 
            type="search" 
            placeholder="Search here..."
            onChange={(e)=> setSearchTerm(e.target.value)} 
            />
          <FaSearch className="text-primary-green"/>
      </div>
    </div>
  );
} 

export default SearchBar;