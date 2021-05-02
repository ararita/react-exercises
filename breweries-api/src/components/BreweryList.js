import React, { useState, useEffect } from "react";
import { uniq } from "lodash";
import BreweryItem from "./BreweryItem";

function BreweryList() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [filterBreweryType, setFilterBreweryType] = useState("");
  const [filterState, setFilterState] = useState("");
  const [search, setSearch] = useState("");
  const [filteredResult, setFilteredresult] = useState([]);

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

  //useEffect so it doesn't compute the filter every time
  //the component rerenders, but only when
  //1. user types in the searchbox,
  //2. or selects from the dropdowns

  useEffect(() => {
    setFilteredresult(
      items
        .filter((brewery) => {
          return filterBreweryType === ""
            ? true
            : brewery.brewery_type === filterBreweryType;
        })
        .filter((brewery) =>
          filterState === "" ? true : brewery.state === filterState
        )
        .filter((brewery) =>
          brewery.name.toLowerCase().includes(search.toLowerCase())
        )
    );
  }, [filterBreweryType, filterState, items, search]);

  // console.log("filteredResult", filteredResult);

  // const breweryFiltered = items
  //   .filter((brewery) => {
  //     return filterBreweryType === ""
  //       ? true
  //       : brewery.brewery_type === filterBreweryType;
  //   })
  //   .filter((brewery) => {
  //     return filterState === "" ? true : brewery.state === filterState;
  //   })
  //   .filter((brewery) => {
  //     return brewery.name.toLowerCase().includes(search.toLowerCase());
  //   });

  const typeOptions = uniq(items.map((brewery) => brewery.brewery_type));
  const stateOptions = uniq(items.map((brewery) => brewery.state));

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div data-testid="brewery-list">Loading...</div>;
  } else {
    return (
      <div data-testid="brewery-list">
        <h1>Breweries</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />

        <br></br>
        <br></br>

        <select onChange={(e) => setFilterState(e.target.value)}>
          <option value={""}>All states</option>
          {stateOptions &&
            stateOptions.map((option) => (
              <option key={option.id} value={option}>
                {option}
              </option>
            ))}
        </select>
        <select onChange={(e) => setFilterBreweryType(e.target.value)}>
          <option value={""}>All types</option>
          {typeOptions &&
            typeOptions.map((option) => (
              <option key={option.id} value={option}>
                {option}
              </option>
            ))}
        </select>
        {items && filteredResult.length !== 0 ? (
          filteredResult.map((item) => (
            <BreweryItem key={item.id} brewery={item} />
          ))
        ) : (
          <p>No result for this query</p>
        )}
      </div>
    );
  }
}

export default BreweryList;
