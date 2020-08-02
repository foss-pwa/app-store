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

const CategoryList = (props) => {
  return (
    <div>
      <h1>{props.label}</h1>
      <div>
        boz boz
      </div>
    </div>
  );
};

export const CategoryPage = () => {
  return (
    <div>
      <CategoryList label="latest"/>
      <CategoryList label="categories"/>
      <CategoryList label="search"/>
      <CategoryList label="setting"/>
    </div>
  )
};
