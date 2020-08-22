import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./style.css";
import { useManifest } from "../sw/useManifest";

const HeaderApp = (props) => {
  return (
    <div className={styles.HeaderApp}>
      <img src={props.icon}/>
      <div>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <a href={props.start_url}>launch</a>
      </div>
    </div>
  );
};

export const Antifeature = (props) => {
  if (!props.list) return <div/>;
  return (
    <div>
      <h2>This app has antifeature</h2>
      <ul>
        {props.list.map((x) => <li key={x}>{x}</li>)}
      </ul>
    </div>
  );
};

export const AppPage = () => {
  const { id } = useParams();
  const { manifest, data } = useManifest(id);
  if (!data) {
    return <div>404</div>
  }
  if (!manifest) {
    return (
      <div>
        <h1>{id}</h1>
        <p>
          loading
        </p>
        <Antifeature list={data.antifeature}/>
        <p>
          <a href={data.repository}>View source</a> ({data.license})
        </p>
      </div>
    )
  }
  return (
    <div>
      <HeaderApp
        name={manifest.name}
        description={manifest.description}
        icon={manifest.icon}
        start_url={manifest.start_url}
      />
      <Antifeature list={data.antifeature}/>
      <p>
        <a href={data.repository}>View source</a> ({data.license})
      </p>
    </div>
  );
};
