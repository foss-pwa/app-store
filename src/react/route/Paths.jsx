import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { CategoryPage } from "../category/CategoryPage";
import { AppPage } from "../app/AppPage";

export const Paths = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><CategoryPage/></Route>
        <Route path="/:id"><AppPage/></Route>  
        <Route path="*">404</Route>
      </Switch>
    </Router>
  );
};
