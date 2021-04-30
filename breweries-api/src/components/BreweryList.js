import React, { useState, useEffect } from "react";
import { uniq } from "lodash";
import BreweryItem from "./BreweryItem";

function BreweryList() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [filterBreweryType, setFilterBreweryType] = useState(null);

  useEffect(() => {
    fetch("https://api.openbrewerydb.org/breweries")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Could not fetch data");
      })
      .then(
        (result) => {
          //       console.log(result)
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const breweryFiltered = items.filter((brewery) => {
    console.log("brewery", brewery);
    if (filterBreweryType === null) {
      return true;
    } else {
      return brewery.brewery_type === filterBreweryType;
    }
  });

  const typeOptions = uniq(items.map((brewery) => brewery.brewery_type));

  // console.log("typeOptions", typeOptions);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div data-testid="brewery-list">Loading...</div>;
  } else {
    return (
      <div data-testid="brewery-list">
        <select onChange={(e) => setFilterBreweryType(e.target.value)}>
          <option value={null}>Filter by type</option>
          {typeOptions &&
            typeOptions.map((option) => (
              <option key={option.id} value={option}>
                {option}
              </option>
            ))}
        </select>
        {items &&
          breweryFiltered
            // .slice(0, 10)
            .map((item) => (
              <BreweryItem key={item.id} id={item.id} brewery={item} />
            ))}
      </div>
    );
  }
}

export default BreweryList;
