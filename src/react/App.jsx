/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import React from "react";
import { ServiceWrapper } from "./sw/ServiceWrapper";
import { Paths } from "./route/Paths";

export const App = () => {
  return (
    <ServiceWrapper>
      <Paths/>
    </ServiceWrapper>
  );
};
