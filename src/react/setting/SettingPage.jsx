import React, { useContext } from "react";
import { ContentContext } from "../sw/ServiceWrapper";
import { Link } from "react-router-dom";
import { Navbar } from "../template/Navbar";
import { IntlSpan } from "../i18n/IntlSpan";

export const SettingPage = () => {
  return (
    <div>
      <h1><IntlSpan k="ui.navbar.setting"/></h1>
      <Navbar enable="setting"/>
    </div>
  );
};
