import React from "react";
import { Link } from "react-router-dom";

function BreweryItem({ brewery }) {
  const { name, brewery_type, city, id } = brewery;
  return (
    <div>
      <h1>{name}</h1>
      <p>{brewery_type}</p>
      <p>{city}</p>
      <Link to={`/brewery/${id}`}>See details</Link>
    </div>
  );
}

export default BreweryItem;
