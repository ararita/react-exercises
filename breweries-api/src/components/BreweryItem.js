import React from "react";
import { Link } from "react-router-dom";

function BreweryItem({ brewery }) {
  return (
    <div>
      <h1>{brewery.name}</h1>
      <p>{brewery.brewery_type}</p>
      <p>{brewery.city}</p>
      <Link to={`/brewery/${brewery.id}`}>See details</Link>
    </div>
  );
}

export default BreweryItem;
