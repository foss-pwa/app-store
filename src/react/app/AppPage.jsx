import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./style.css";
import { useManifest } from "../sw/useManifest";
import { IntlSpan } from "../i18n/IntlSpan";

const HeaderApp = (props) => {
  return (
    <div className={styles.HeaderApp}>
      <img src={props.icon}/>
      <div>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <a href={props.start_url} target="_blank"><IntlSpan k="ui.launch"/></a>
      </div>
    </div>
  );
};

export const Antifeature = (props) => {
  if (!props.list) return <div/>;
  return (
    <div className={styles.anti}>
      <div>
        <img className={styles.antiImage} src="/dist/assets/danger1.svg"/>
        <IntlSpan className={styles.antiHeader} k="ui.antifeature"/>
      </div>
      <ul>
        {props.list.map((x) => <li key={x}><IntlSpan k={['antifeature', x]}/></li>)}
      </ul>
    </div>
  );
};

const SourceCode = (props) => {
  const { data } = props;
  return (
    <p>
      <a href={data.repository}><IntlSpan k="ui.view_source"/></a> ({data.license})
    </p>
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
          <IntlSpan k="ui.loading"/>
        </p>
        <Antifeature list={data.antifeature}/>
        <SourceCode data={data}/>
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
      <SourceCode data={data}/>
    </div>
  );
};
