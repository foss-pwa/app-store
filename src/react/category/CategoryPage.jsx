import React, { useContext } from "react";
import { ContentContext } from "../sw/ServiceWrapper";
import { Link } from "react-router-dom";
import { Navbar } from "../template/Navbar";
import styles from "./style.css";

const CategoryList = (props) => {
  return (
    <div className={styles.categoryList}>
      <h1>{props.name}</h1>
      <div>
        {props.apps.map((x)=>(
          <div key={x} className={styles.categoryItem}>
            <Link to={`/${x}`}>{x}</Link>
          </div>
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
