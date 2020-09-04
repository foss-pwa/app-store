import React, { useContext } from "react";
import { ContentContext } from "../sw/ServiceWrapper";
import { Link } from "react-router-dom";
import { Navbar } from "../template/Navbar";
import { IntlSpan } from "../i18n/IntlSpan";
import styles from "./SearchPage.css";

export const SearchPage = () => {
  return (
    <div className={styles.back}>
      <h1><IntlSpan k="ui.not_implemented"/></h1>
      <Navbar enable="search"/>
    </div>
  );
};
