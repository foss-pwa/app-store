import React, { useContext } from "react";
import { ContentContext } from "../sw/ServiceWrapper";
import { Link } from "react-router-dom";
import { Navbar } from "../template/Navbar";
import { IntlSpan } from "../i18n/IntlSpan";
import { CommonItem } from "../category/CategoryItem";
import LE1S from "./LatestE1.css";
import styles from "./LatestPage.css";
import { CategoryElement } from "../category/CategoryElement";

const LatestElement = CommonItem({ styles: LE1S, IC: {
  AfterName: ({ data }) => {
    if (!data) return <div/>;
    return (
      <div className={styles.categoryName}>
        {data.category.map((x)=>(
          <CategoryElement k={x}/>
        ))}
      </div>
    );
  },
}});

export const LatestPage = () => {
  const { data } = useContext(ContentContext);
  console.log(data);
  return (
    <div class={styles.back}>
      <div>
        {data
          .sort((a, b) => a.cs < b.cs)
          .map(x=><LatestElement key={x.id} id={x.id}></LatestElement>)}
      </div>
      <Navbar enable="latest"/>
    </div>
  );
};
