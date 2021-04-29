import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BreweryList from "./components/BreweryList";
import Brewery from "./components/Brewery";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={BreweryList} />
        <Route path="/brewery/:id" exact component={Brewery} />
      </Switch>
    </Router>
  );
}

export default App;
