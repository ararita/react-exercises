// import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [storyId, setStoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          // console.log(myJson);
          setLoading(true);
          setData(myJson.splice(20));
          for (let id of myJson) {
            // console.log("id", id);
            fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
            )
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("Could not fetch story id");
              })
              .then((myId) => {
                console.log(myId);
                setStoryId(myId);
              });
          }
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
    // .catch((err) => {
    //   console.log("error", err);
    //   setError(err.message);
    // });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        {/* <div>{JSON.stringify(storyId)}</div> */}
        <div>
          {" "}
          {data.map((story) => (
            <h1 key={story.id}>{story.title}</h1>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
