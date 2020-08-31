import React, { useContext } from "react";
import { ContentContext } from "../sw/ServiceWrapper";
import { Link } from "react-router-dom";
import { Navbar } from "../template/Navbar";
import { IntlSpan } from "../i18n/IntlSpan";

export const LatestPage = () => {
  return (
    <div>
      <Navbar enable="latest"/>
    </div>
  );
};
