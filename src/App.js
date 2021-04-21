// import "./App.css";
import { useState, useEffect } from "react";

function getStory(id) {
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
  const [stories, setStories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
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
          const myPromises = [];
          for (let id of myJson) {
            myPromises.push(getStory(id));
          }
          return Promise.all(myPromises).then((stories) => {
            setStories(stories);
            setIsLoaded(true);
          });
        },
        (error) => {
          setError(error);
        }
      );
    // .catch((err) => setError(err.message));
  }, []);
  console.log(stories);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        {/* <pre>{JSON.stringify(stories, null, 2)}</pre>{" "} */}
        {stories.map((story, id) => (
          <div key={id}>
            <h3>by: {story.by}</h3>
            <a href={story.url}>{story.title}</a>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
