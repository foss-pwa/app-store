import React, { useContext } from "react";
import { ContentContext } from "../sw/ServiceWrapper";
import { Link } from "react-router-dom";
import { Navbar } from "../template/Navbar";
import styles from "./style.css";
import { CategoryItem } from "./CategoryItem";
import { IntlSpan } from "../i18n/IntlSpan";

const CategoryList = (props) => {
  return (
    <div className={styles.categoryList}>
      <h1><IntlSpan k={['categories', props.name]}/></h1>
      <div>
        {props.apps.map((x)=>(
          <CategoryItem key={x} id={x}/>
        ))}
      </div>
    </div>
  );
};

export const CategoryPage = () => {
  const { categories } = useContext(ContentContext);
  return (
    <div>
      {categories.map((x)=>(
        <CategoryList key={x.name} name={x.name} apps={x.apps}/>
      ))}
      <Navbar/>
    </div>
  );
};
