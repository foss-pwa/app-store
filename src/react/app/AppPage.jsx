import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./style.css";
import { useManifest } from "../sw/useManifest";
import { IntlSpan } from "../i18n/IntlSpan";
import { getSimpleData } from "../../source-code-info-getter/index.mjs";
import { getFullData } from "../../source-code-info-getter/index.mjs";
import { EA as BEA } from "../util/EA";
import { EAButton } from "../util/Button";
import { blue } from "../category/CategoryItem.css";
import { CategoryElement } from "../category/CategoryElement";

const EA = (props) => <BEA className={styles.link} {...props}/>

const HeaderApp = (props) => {
  return (
    <div className={styles.HeaderApp}>
      <img src={props.icon} className={blue}/>
      <div>
        <h1>{props.name} {props.category.map((x)=>(
          <CategoryElement k={x}/>
        ))}</h1>
        <p>{props.description}</p>
        <EAButton href={props.start_url} k="ui.launch"/>
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

const IssueCount = ({ href, count }) => {
  if (!count) {
    return <EA href={href}>
      <IntlSpan k="ui.source.issue_and_bug"/>
    </EA>
  }
  return <EA href={href}>
    <IntlSpan k="ui.source.issue_and_bug"/> (<i className="fa fa-exclamation-circle"/> {count})
  </EA>;
};


const SourceCode = (props) => {
  const { data } = props;
  const [x, setX] = useState(getSimpleData(data));
  useEffect(()=>{
    (async ()=>{
      setX(await getFullData(data));
    })();
  }, [data]);
  if (data.type === 'github') {
    return (
      <div>
        <h2><IntlSpan k="ui.source.source_code_and_contrib"/></h2>
        <ul>
          <li>
            <IntlSpan k="ui.source.source_code_in"/>{' '}
            <EA href={`https://github.com/${data.repository}`}>
              <i className="fa fa-github"/> <IntlSpan k="ui.source.github.repo"/>
            </EA>
          </li>
          {x.issue && <li>
            <IssueCount href={x.issue.url} count={x.issue.countOpen}/>
          </li>}
          {x.license && <li>
            <IntlSpan k="ui.source.license"/>{': '}
            <EA href={`https://spdx.org/licenses/${x.license}.html`}>
              {x.license}
            </EA>
          </li>}
        </ul>
      </div>
    );
  }
  return <p/>;
};

export const AppPage = () => {
  const { id } = useParams();
  const { manifest, data } = useManifest(id);
  if (!data) {
    return <div>404</div>
  }
  if (!manifest) {
    return (
      <div className={styles.appPage}>
        <h1>{id}</h1>
        <p>
          <IntlSpan k="ui.loading"/>
        </p>
        <Antifeature list={data.antifeature}/>
        <SourceCode data={data.source}/>
      </div>
    )
  }
  return (
    <div className={styles.background}>
      <div className={styles.appPage}>
        <HeaderApp
          name={manifest.name}
          category={data.category}
          description={manifest.description}
          icon={manifest.icon}
          start_url={manifest.start_url}
        />
        <Antifeature list={data.antifeature}/>
        <SourceCode data={data.source}/>
      </div>
    </div>
  );
};
