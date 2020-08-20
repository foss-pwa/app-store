import React from "react";
import styles from "./Navbar.css";

const NavbarButton = (props) => {
  return (
    <div className={styles.navbarButton}>{props.label}</div>
  )
};

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <NavbarButton label="latest"/>
      <NavbarButton label="categories"/>
      <NavbarButton label="search"/>
      <NavbarButton label="setting"/>
    </div>
  )
};
