/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import React from "react";
import { Navbar } from "./Navbar";
import { CategoryPage } from "./category/CategoryPage";
import { ServiceWrapper } from "./sw/ServiceWrapper";

export const App = () => {
  return (
    <ServiceWrapper>
      <CategoryPage/>
      <Navbar/>
    </ServiceWrapper>
  );
};
