import React from "react";
import styles from "./Navbar.css";
import { IntlSpan } from "../i18n/IntlSpan";
import classNames from "classnames";
import { Link } from "react-router-dom";

const icons = {
  setting: 'fa-wrench',
  latest: 'fa-sort-amount-asc',
  categories: 'fa-th-list',
  search: 'fa-search',
};

const NavbarButton = (props) => {
  const cn = classNames({
    [styles.navbarButton]: true,
    [styles.navbarButtonEnable]: props.enable,
  });
  return (
    <Link className={cn} to={`/${props.label}`}>
      <i className={`fa ${icons[props.label]}`}></i><br/>
      <IntlSpan k={['ui', 'navbar', props.label]}/>
    </Link>
  );
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
