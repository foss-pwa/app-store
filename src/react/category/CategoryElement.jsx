import React, { useContext } from "react";
import { IntlSpan } from "../i18n/IntlSpan";
import styles from "./CategoryElement.css";
import { ContentContext } from "../sw/ServiceWrapper";

export const CategoryElement = (props) => {
  const { categories } = useContext(ContentContext);
  const myc = categories.find((x) => x.name === props.k);
  const color = myc ? myc.color : 'white';
  console.log(color);
  return (
    <span className={styles.elem} style={{ backgroundColor: color }}>
      <IntlSpan k={['categories', props.k]}/>
    </span>
  );
};
