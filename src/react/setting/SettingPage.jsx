import React, { useContext, useState } from "react";
import { ContentContext } from "../sw/ServiceWrapper";
import { Link } from "react-router-dom";
import { Navbar } from "../template/Navbar";
import { IntlSpan } from "../i18n/IntlSpan";
import { Button } from "../util/Button";
import styles from "./SettingPage.css";

export const SettingPage = () => {
  const content = useContext(ContentContext);
  const [temp, setTemp] = useState({
    ...content.setting,
    lang: content.setting.lang.toString(),
  });
  const setKey = (key) => (e) => {
    setTemp({
      ...temp,
      [key]: e.target.value,
    });
  };
  const clearAll = () => {
    localStorage.removeItem('c');
    window.location.reload();  
  };
  const saveSetting = () => {
    localStorage.setItem('c', JSON.stringify({
      ...content,
      setting: {
        ...temp,
        lang: temp.lang.split(',').map((x)=>x.trim()),
      },
    }));
    window.location.reload();
  };
  return (
    <div className={styles.back}>
      <h1><IntlSpan k="ui.navbar.setting"/></h1>
      <Button k="ui.save" onClick={saveSetting}/>
      <div>
        <h2><IntlSpan k="ui.general"/></h2>
        <div>
          <IntlSpan k="ui.preferred_language"/>{': '}
          <input
            dir="ltr"
            type="text"
            value={temp.lang}
            onChange={setKey('lang')}
          />
        </div>
        <div>
          <IntlSpan k="ui.cors_proxy"/>{': '}
          <input
            dir="ltr"
            type="text"
            value={"https://allorigins.win"}
            disabled={true}
          />
        </div>      
      </div>
      <div>
        <h2><IntlSpan k="ui.storage"/></h2>
        <div>
          <IntlSpan k="ui.remove_everything"/>: <Button k="ui.clear" onClick={clearAll}/>
        </div>
      </div>
      <Navbar enable="setting"/>
    </div>
  );
};
