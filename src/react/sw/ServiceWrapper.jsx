import React, { useState, useEffect } from "react";
import { Spinner } from "../util/Spinner";
import { init } from "../i18n/i18n";

const firstFetchs = () => Promise.all([
  fetch("/dist/data/0.json", { cache: 'reload' }).then(res=>res.json()),
  fetch("/dist/data/cs.json", { cache: 'reload' }).then(res=>res.json()),
  fetch("/dist/data/categories.json", { cache: 'reload' }).then(res=>res.json()),
]);

const delay = (second) => new Promise(res=>setTimeout(res, second*1000));

export const ContentContext = React.createContext();

export const ServiceWrapper = (props) => {
  const [ready, setReady] = useState(false);
  const [content, setContent] = useState({});
  useEffect(()=>{
    let cancel = false;
    (async ()=>{
      if (!ready) return;
      while (true) {
        if (cancel) return;
        try {
          console.log('Checking for update' + content.cs.mxcs);
          const cs = await (await fetch("/dist/data/cs.json", { cache: 'reload' })).json();
          if (content.cs.version !== cs.version) {
            return;
          }
          if (content.cs.mxcs !== cs.mxcs) {
            console.log('update');
            const res = await firstFetchs();
            const nc = {
              ...content,
              data: res[0],
              cs: res[1],
              categories: res[2],
            };
            setContent(nc);
            localStorage.setItem('c', JSON.stringify(nc));
          }
        } catch(e) {
          console.log(e);
        }
        await delay(5);
      }
    })();
    return () => { cancel = true; };
  }, [ready, content]);
  useEffect(()=>{
    (async () => {
      try{
        const c = localStorage.getItem('c');
        if (c != undefined) {
          const cj = JSON.parse(c);
          await init(cj.setting.lang);
          setContent(cj);
          setReady(true);
          return;
        }
        const [res] = await Promise.all([
          firstFetchs(), init(navigator.languages),
        ]);
        const nc = {
          data: res[0],
          cs: res[1],
          categories: res[2],
          setting: {
            lang: navigator.languages,
          },
        };
        setContent(nc);
        localStorage.setItem('c', JSON.stringify(nc));
        setReady(true);
      } catch(e) {
        console.log(e);
      }
    })();
  }, []);
  if (!ready) {
    return (
      <div style={{ width: '100vmin', height: '100vmin', background: 'black' }}>
        <Spinner/>
      </div>
    );
  }
  return (
    <ContentContext.Provider value={content}>
      {props.children}
    </ContentContext.Provider>
  );
};
