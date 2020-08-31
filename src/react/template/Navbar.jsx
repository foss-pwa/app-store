import React from "react";
import styles from "./Navbar.css";
import { IntlSpan } from "../i18n/IntlSpan";
import classNames from "classnames";
import { Link } from "react-router-dom";

const NavbarButton = (props) => {
  const cn = classNames({
    [styles.navbarButton]: true,
    [styles.navbarButtonEnable]: props.enable,
  });
  return (
    <Link className={cn} to={`/${props.label}`}>
      <IntlSpan k={['ui', 'navbar', props.label]}/>
    </Link>
  
  )
};

export const Navbar = ({ enable }) => {
  const buttons = [
    "latest",
    "categories",
    "search",
    "setting",
  ];
  return (
    <div>
      <div className={styles.navbarPlace}/>
      <div className={styles.navbar}>
        {buttons.map((x) => <NavbarButton label={x} enable={enable === x}/>)}
      </div>
    </div>
  )
};
