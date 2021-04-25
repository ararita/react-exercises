// import "./App.css";
import { useState, useEffect } from "react";
import { uniq } from "lodash";

function getItem(id) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Could not fetch story id");
  });
}

function App() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");
  const [filterByType, setFilterByType] = useState();

  //https://hacker-news.firebaseio.com/v0/item/12.json?print=pretty
  //https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Could not fetch data");
      })
      .then(
        (myJson) => {
          const myPromises = [];
          for (let id of myJson) {
            myPromises.push(getItem(id));
          }
          return Promise.all(myPromises).then((items) => {
            setItems(items);
            setIsLoaded(true);
          });
        },
        (error) => {
          setError(error);
        }
      );
    // .catch((err) => setError(err));
  }, []);
  console.log("items", items);

  const filteredItems = items.filter((item) => {
    return item.type === filterByType;
    // if (filterByType === null) {
    //   return true;
    // } else {
    //   return item.type === filterByType;
    // }
  });

  console.log("filteredItems", filteredItems);

  const itemTypeOptions = uniq(items.map((item) => item.type));

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        {/* <pre>{JSON.stringify(items, null, 2)}</pre>{" "} */}

        <select onChange={(e) => setFilterByType(e.target.value)}>
          <option value={null}>All types</option>
          {itemTypeOptions &&
            itemTypeOptions.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
        </select>
        {items &&
          filteredItems.map((item) => (
            <div key={item.id}>
              <h3>by: {item.by}</h3>
              <a href={item.url}>{item.title}</a>
            </div>
          ))}
        {/* {items.map((item, id) => (
          <div key={id}>
            <h3>by: {item.by}</h3>
            <a href={item.url}>{item.title}</a>
          </div>
        ))} */}
      </div>
    );
  }
}

export default App;
