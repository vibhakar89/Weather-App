import React from "react";

function SearchEngine({ query, setQuery, search }) {
  // Handles pressing "Enter" key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(e); // pass the event
    }
  };

  // Handles button click
  const handleClick = (e) => {
    search(e); // pass the event
  };

  return (
    <div className="SearchEngine">
      <input
        type="text"
        className="city-search"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleClick}>
        <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
      </button>
    </div>
  );
}

export default SearchEngine;
