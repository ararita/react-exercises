// import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  //https://hacker-news.firebaseio.com/v0/item/12.json?print=pretty
  //https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/12.json?print=pretty`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Could not fetch data");
      })
      .then((myJson) => setData(myJson))
      .catch((err) => {
        console.log("error", err);
        setError(err.message);
      });
  }, []);

  if (data) {
    return (
      <div className="App">
        <div>{JSON.stringify(data)}</div>
        <h2>{data.by}</h2>
      </div>
    );
  }
}

export default App;
