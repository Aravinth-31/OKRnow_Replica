import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import SelectPage from "../components/teams_components/SelectPage";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home"  component={Home} />
      <Route path="/select"  component={SelectPage} />
    </Switch>
  </Router>
);
