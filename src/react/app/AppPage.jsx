import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContentContext } from "../sw/ServiceWrapper";
import { bestLang, getOld } from "../sw/manifestStore";

export const AppPage = () => {
  const { id } = useParams();
  const { data } = useContext(ContentContext);
  const [manifest, setManifest] = useState();
  const obj = data.find((x)=>x.id === id);
  useEffect(()=>{
    (async () => {
      if (obj === undefined) return;
      const l = bestLang(obj.lang);
      const url = obj.lang[l].manifest;
      const r = await getOld(url, l);
      setManifest({
        ...r,
        start_url: new URL(r.start_url, url).href,
      });
    })();
  }, [id]);
  if (!obj) {
    return <div>404</div>
  }
  if (!manifest) {
    return (
      <div>
        <h1>{id}</h1>
        <p>
          loading
        </p>
        <p>
          <a href={obj.repository}>View source</a> ({obj.license})
        </p>    
      </div>
    )
  }
  return (
    <div>
      <h1>{manifest.name}</h1>
      <p>
        <a href={manifest.start_url}>launch</a>
      </p>
      <p>
        <a href={obj.repository}>View source</a> ({obj.license})
      </p>
    </div>
  );
};
