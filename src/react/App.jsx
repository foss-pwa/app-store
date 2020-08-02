/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import React from "react";
import { Navbar } from "./Navbar";
import { CategoryPage } from "./category/CategoryPage";

export const App = () => {
  return (
    <div>
      <CategoryPage/>
      <Navbar/>
    </div>
  );
}
