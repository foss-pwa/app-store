import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryItem.css";
import { Spinner } from "../util/Spinner";
import { useManifest } from "../sw/useManifest";

export const CategoryItem = (props) => {
  const x = props.id;
  const { data, manifest, error } = useManifest(x);
  if (error) {
    return (
      <Link as={'div'} to={`/${x}`} className={styles.item}>
        <div className={styles.image}>E</div>
        <div className={styles.label}>
          {x.replace(/_/g, ' ')}
        </div>
      </Link>
    );
  }
  if (!manifest) {
    return (
      <Link as={'div'} to={`/${x}`} className={styles.item}>
        <Spinner className={styles.image}/>
        <div className={styles.label}>
          {x.replace(/_/g, ' ')}
        </div>
      </Link>
    );
  }
  return (
    <Link as={'div'} to={`/${x}`} className={styles.item}>
      <img className={styles.image} src={manifest.icon}/>
      <div className={styles.label}>
        {manifest.name}
      </div>
    </Link>
  );
};
