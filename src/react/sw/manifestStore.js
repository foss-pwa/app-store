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
    return cr.json();
  }
  const fr = await fetch(req);
  await ch.put(req, fr.clone());
  return fr.json();
};
