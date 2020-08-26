import React from "react";
import styles from "./Navbar.css";
import { IntlSpan } from "../i18n/IntlSpan";

const NavbarButton = (props) => {
  return (
    <div className={styles.navbarButton}>
      <IntlSpan k={['ui', 'navbar', props.label]}/>
    </div>
  )
};

export const Navbar = () => {
  return (
    <div>
      <div className={styles.navbarPlace}/>
      <div className={styles.navbar}>
        <NavbarButton label="latest"/>
        <NavbarButton label="categories"/>
        <NavbarButton label="search"/>
        <NavbarButton label="setting"/>
      </div>
    </div>
  )
};
