import React, { useState, useEffect } from "react";
import { Spinner } from "../util/Spinner";

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
        console.log('Checking for update' + content.cs.mxcs);
        const cs = await (await fetch("/dist/data/cs.json", { cache: 'reload' })).json();
        if (content.cs.mxcs !== cs.mxcs) {
          console.log('update');
          const res = await firstFetchs();
          const nc = {
            data: res[0],
            cs: res[1],
            categories: res[2],
          };
          setContent(nc);
          localStorage.setItem('c', JSON.stringify(nc));
        }
        await delay(5);
      }
    })();
    return () => { cancel = true; };
  }, [ready, content]);
  useEffect(()=>{
    (async () => {
      const c = localStorage.getItem('c');
      if (c !== undefined) {
        setReady(true);
        setContent(JSON.parse(c));
        return;
      }
      const res = await firstFetchs();
      setReady(true);
      const nc = {
        data: res[0],
        cs: res[1],
        categories: res[2],
      };
      setContent(nc);
      localStorage.setItem('c', JSON.stringify(nc));
    })();
  }, []);
  if (!ready) {
    return (
      <Spinner/>
    );
  }
  return (
    <ContentContext.Provider value={content}>
      {props.children}
    </ContentContext.Provider>
  );
};
