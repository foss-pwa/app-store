import React from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { CategoryPage } from "../category/CategoryPage";
import { AppPage } from "../app/AppPage";
import { SettingPage } from "../setting/SettingPage";
import { SearchPage } from "../search/SearchPage";
import { LatestPage } from "../latest/LatestPage";

export const Paths = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to="/categories" /></Route>
        <Route path="/categories"><CategoryPage/></Route>
        <Route path="/setting"><SettingPage/></Route>  
        <Route path="/search"><SearchPage/></Route>  
        <Route path="/latest"><LatestPage/></Route>  
        <Route path="/app/:id"><AppPage/></Route>  
        <Route path="*">404</Route>
      </Switch>
    </Router>
  );
};
