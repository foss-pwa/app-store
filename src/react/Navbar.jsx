import React from "react";

const navbarStyle = {
  backgroundColor: 'blue',
  color: 'white',
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: 'calc(100% - 2rem)',
  padding: '.5rem 1rem',
  display: 'flex',
};

const buttonStyle = {
  flexGrow: 1, textAlign: 'center',
};

const NavbarButton = (props) => {
  return (
    <div style={buttonStyle}>{props.label}</div>
  )
};

export const Navbar = () => {
  return (
    <div style={navbarStyle}>
      <NavbarButton label="latest"/>
      <NavbarButton label="categories"/>
      <NavbarButton label="search"/>
      <NavbarButton label="setting"/>
    </div>
  )
};