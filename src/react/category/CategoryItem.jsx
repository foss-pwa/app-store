import React, { useContext } from "react";
import { Link } from "react-router-dom";
import myStyles from "./CategoryItem.css";
import { Spinner } from "../util/Spinner";
import { useManifest } from "../sw/useManifest";
import classNames from "classnames";

export const CommonItem = ({ styles, IC }) => (props) => {
  const x = props.id;
  const { data, manifest, error } = useManifest(x);
  const Wrapper = (p) => <Link as={'div'} to={`/app/${x}`} className={styles.item} {...p}/>
  if (error) {
    return (
      <Wrapper>
        <img className={styles.image} src="/dist/assets/error1.svg"/>
        <div className={styles.label}>
          {x.replace(/_/g, ' ')}
          {IC && IC.AfterName && <IC.AfterName props={props} data={data}/>}
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
          {IC && IC.AfterName && <IC.AfterName props={props} data={data}/>}
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <img
        className={classNames(styles.image, styles.blue)}
        src={manifest.icon}
      />
      {data.antifeature && <img className={styles.danger} src="/dist/assets/danger1.svg"/>}
      <div className={styles.label}>
        {manifest.name}
        {IC && IC.AfterName && <IC.AfterName props={props} manifest={manifest} data={data}/>}
      </div>
    </Wrapper>
  );
};

export const CategoryItem = CommonItem({ styles: myStyles, IC: {
  AfterName: ({ manifest }) => {
    if (!manifest || !manifest.description) return <div/>;
    const n = 25;
    const text = manifest.description.length > n ? manifest.description.slice(0, n) + "..." : manifest.description;
    return (
      <div className={myStyles.ICdescription}>{ text }</div>
    );
  },
}});
