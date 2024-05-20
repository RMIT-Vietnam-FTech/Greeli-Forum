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
      <div className="input-wrapper d-flex align-items-center justify-content-between w-50 rounded-pill border border-3 border-primary-green ">
        <input 
            className="search_input w-100 my-1 mx-2 ps-2 border-0 bg-transparent outline-no " 
            type="text" 
            placeholder="Search here..."
            onChange={(e)=> setSearchTerm(e.target.value)} 
            />
          <FaSearch size="40" className="btn btn-lg bg-primary-green text-light rounded-circle m-1 p-2 float-end"/>
      </div>
  );
} 

export default SearchBar;