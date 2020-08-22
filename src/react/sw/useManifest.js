import React, { useContext, useEffect, useState } from "react";
import { ContentContext } from "../sw/ServiceWrapper";
import { bestLang, getOld } from "../sw/manifestStore";
import { bestFitIcon } from "../../util/manifestParser";

export const useManifest = (id) => {
  const { data: apps } = useContext(ContentContext);
  const [manifest, setManifest] = useState();
  const data = apps.find((x)=>x.id === id);
  useEffect(()=>{
    (async () => {
      if (data === undefined) return;
      const l = bestLang(data.lang);
      const url = data.lang[l].manifest;
      const r = await getOld(url, l);
      setManifest({
        ...r,
        start_url: new URL(r.start_url, url).href,
        icon: new URL(bestFitIcon(r.icons, 100), url).href,
      });
    })();
  }, [id]);
  if (!data) return { error: 'NotInRepo' };
  return { manifest, data };
};
