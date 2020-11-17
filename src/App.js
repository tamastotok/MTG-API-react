import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Details from "./components/Details";
import NewFetch from "./components/NewFetch";

function App() {
  return (
    <Router >
      <div className="App">
        <Switch>
          <Route exact path="/" component={NewFetch} />
          <Route path="/cardID/:id" component={Details} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
