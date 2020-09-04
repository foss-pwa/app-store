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
      <h1 className={styles.categoryName}>
        <IntlSpan k={['categories', props.name]}/>
        <Link to={`/search`} className={styles.showAll}>
          <IntlSpan k="ui.show_all"/> {props.count}
        </Link>
      </h1>
      <div 
        className={styles.categoryImage} 
        style={{
          backgroundImage: `url('/dist/assets/category/${props.name}.png')`,
          backgroundColor: props.color,
        }}
      >
        <div className={styles.categoryDiv}>
          {props.apps.map((x)=>(
            <CategoryItem key={x} id={x}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CategoryPage = () => {
  const { categories, data } = useContext(ContentContext);
  const count = (c) => data.filter(
    (app) => app.category.find((x) => x === c) !== undefined,
  ).length;
  return (
    <div>
      {categories.map((x)=>(
        <CategoryList
          {...x}
          count={count(x.name)}
        />
      ))}
      <Navbar enable="categories"/>
    </div>
  );
};
