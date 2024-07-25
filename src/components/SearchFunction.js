import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SearchFunction = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const validateForm = () => {
    return true; 
  };

  const onButtonClick = () => {
    if (validateForm()) {
        navigate('/SearchFunction'); 
    }
  };

  return (
    <div className="search">
      <label>
        <span>Search</span>
      </label>
      <div className="search-content">
        <input
          className="search-input"
          type="text"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <button className="navigate-button" onClick={onButtonClick}>
        Navigate to SearchFunction
      </button>
    </div>
  );
};

export default SearchFunction;
