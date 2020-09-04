import React from "react";
import { IntlSpan } from "../i18n/IntlSpan";
import styles from "./Button.css";
import { EA } from "./EA";

export const Button = (props) => {
  return (
    <button onClick={props.onClick} className={styles.button}>
      <IntlSpan k={props.k}/>
    </button>
  );
};

export const EAButton = (props) => {
  return (
    <EA href={props.href} className={styles.button}>
      <IntlSpan k={props.k}/>
    </EA>
  );
};
