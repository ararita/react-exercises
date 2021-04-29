import React, { useEffect, useState } from "react";

function Brewery({ match }) {
  console.log("match", match);

  const id = match.params.id;
  // console.log(id);

  // const brewery = breweries.find((brewery) => brewery.id === match.params.id);

  const [item, setItem] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.openbrewerydb.org/breweries/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Could not fetch data");
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div data-testid="brewery-list">Loading...</div>;
  } else {
    return (
      <div data-testid="brewery-detail">
        <h1>{item.name}</h1>
        <p>{item.brewery_type}</p>
        <p>{item.country}</p>
        <p>{item.city}</p>
        <p>{item.street}</p>
        <p>{item.address_2}</p>
        <p>{item.address_3}</p>
        <p>{item.phone}</p>
        <a href={item.website_url}>{item.website_url}</a>
      </div>
    );
  }
}

export default Brewery;
