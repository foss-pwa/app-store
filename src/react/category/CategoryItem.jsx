import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryItem.css";
import { Spinner } from "../util/Spinner";
import { useManifest } from "../sw/useManifest";

export const CategoryItem = (props) => {
  const x = props.id;
  const { data, manifest, error } = useManifest(x);
  const Wrapper = (p) => <Link as={'div'} to={`/app/${x}`} className={styles.item} {...p}/>
  if (error) {
    return (
      <Wrapper>
        <img className={styles.image} src="/dist/assets/error1.svg"/>
        <div className={styles.label}>
          {x.replace(/_/g, ' ')}
        </div>
      </Wrapper>
    );
  }
  if (!manifest) {
    return (
      <Wrapper>
        <Spinner className={styles.image}/>
        <div className={styles.label}>
          {x.replace(/_/g, ' ')}
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <img className={styles.image} src={manifest.icon}/>
      {data.antifeature && <img className={styles.danger} src="/dist/assets/danger1.svg"/>}
      <div className={styles.label}>
        {manifest.name}
      </div>
    </Wrapper>
  );
};
