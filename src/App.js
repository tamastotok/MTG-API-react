import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NewFetch from "./components/NewFetch";
import Details from "./components/Details"

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={NewFetch} />
          <Route path="/:id" exact component={Details} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
