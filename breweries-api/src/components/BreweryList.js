import React, { useState, useEffect } from "react";
import BreweryItem from "./BreweryItem.jsx";

function BreweryList() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div data-testid="brewery-list">Loading...</div>;
  } else {
    return (
      <div data-testid="brewery-list">
        {items &&
          items
            .slice(0, 10)
            .map((item) => (
              <BreweryItem
                key={item.id}
                id={item.id}
                brewery={item}
                data-testid="brewery-list-detail-link-:id"
              />
            ))}
      </div>
    );
  }
}

export default BreweryList;
