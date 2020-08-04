import React, { useState, useEffect } from "react";

const firstFetchs = () => Promise.all([
  fetch("/dist/data/0.json").then(res=>res.json()),
  fetch("/dist/data/cs.json").then(res=>res.json()),
  fetch("/dist/data/categories.json").then(res=>res.json()),
]);

const ContentContext = React.createContext();

export const ServiceWrapper = (props) => {
  console.log('aaah');
  const [ready, setReady] = useState(false);
  const [content, setContent] = useState({});
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
  });
  if (!ready) {
    return (
      <div style={{background:'black', position: 'fixed', top:0, left:0, width:'100%', height:'100%'}}>
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <style>
            {`.sk-chase{width:40vmin;height:40vmin;position:fixed;top:calc(50% - 20vmin);left:calc(50% - 20vmin);animation:sk-chase 2.5s infinite linear both}.sk-chase-dot{width:100%;height:100%;position:absolute;left:0;top:0;animation:sk-chase-dot 2.0s infinite ease-in-out both}.sk-chase-dot:before{content:'';display:block;width:25%;height:25%;background-color:#fff;border-radius:100%;animation:sk-chase-dot-before 2.0s infinite ease-in-out both}.sk-chase-dot:nth-child(1){animation-delay:-1.1s}.sk-chase-dot:nth-child(2){animation-delay:-1.0s}.sk-chase-dot:nth-child(3){animation-delay:-0.9s}.sk-chase-dot:nth-child(4){animation-delay:-0.8s}.sk-chase-dot:nth-child(5){animation-delay:-0.7s}.sk-chase-dot:nth-child(6){animation-delay:-0.6s}.sk-chase-dot:nth-child(1):before{animation-delay:-1.1s}.sk-chase-dot:nth-child(2):before{animation-delay:-1.0s}.sk-chase-dot:nth-child(3):before{animation-delay:-0.9s}.sk-chase-dot:nth-child(4):before{animation-delay:-0.8s}.sk-chase-dot:nth-child(5):before{animation-delay:-0.7s}.sk-chase-dot:nth-child(6):before{animation-delay:-0.6s}@keyframes sk-chase{100%{transform:rotate(360deg)}}@keyframes sk-chase-dot{100%,80%{transform:rotate(360deg)}}@keyframes sk-chase-dot-before{50%{transform:scale(0.4)}0%,100%{transform:scale(1.0)}}`}
          </style>
        </div>
      </div>
    );
  }
  return (
    <ContentContext.Provider value={content}>
      {props.children}
    </ContentContext.Provider>
  );
};
