export const bestLang = (obj) => {
  const r = navigator.languages.find((x) => {
    if (obj[x]) return true;
    return false;
  });
  if (r) return r;
  return Object.keys(obj)[0];
};

export const getOld = async (url, lang) => {
  const ch = await caches.open('manifest-cache-'+lang);
  const req = new Request(url, {
    headers: {
      "Accept-language": lang,
    },
  });
  const cr = await ch.match(req);
  if (cr !== undefined) {
    console.log(cr);
    return cr.json();
  }
  try {
    console.log(req);
    const fr = await fetch(req);
    await ch.put(req, fr.clone());
    return fr.json();  
  } catch (e) {
    console.log(e);
    const proxyReq = new Request(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {
      headers: {
        "Accept-language": lang,
      },
    });
    console.log(proxyReq);
    const fr = await fetch(proxyReq);
    const data = (await fr.json()).contents;
    await ch.put(req, new Response(data));
    return JSON.parse(data);
  }
};
