import React from "react";
import styles from "./Spinner.css";

export const Spinner = (props) => {
  return (
    <div {...props}>
      <div className={styles.skChase}>
        <div className={styles.skChaseDot}></div>
        <div className={styles.skChaseDot}></div>
        <div className={styles.skChaseDot}></div>
        <div className={styles.skChaseDot}></div>
        <div className={styles.skChaseDot}></div>
        <div className={styles.skChaseDot}></div>
        <style>
        </style>
      </div>
    </div>
  );
};
