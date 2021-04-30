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

  const {
    name,
    brewery_type,
    country,
    city,
    street,
    address_2,
    address_3,
    phone,
    website_url,
    postal_code,
  } = item;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div data-testid="brewery-detail">Loading...</div>;
  } else {
    return (
      <div data-testid="brewery-detail">
        <h1>{name}</h1>
        <p>{brewery_type}</p>
        <p>{country}</p>
        <p>{city}</p>
        <p>{street}</p>
        <p>{postal_code}</p>
        <p>{address_2}</p>
        <p>{address_3}</p>
        <p>{phone}</p>
        <a href={website_url}>{website_url ? website_url : ""}</a>
      </div>
    );
  }
}

export default Brewery;
