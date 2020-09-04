let pl = navigator.languages;

const d = new Map();

export const getText = (ar) => {
  for (const l of pl) {
    if (!d.has(l)) continue;
    let x = d.get(l);
    for (const key of ar) {
      x = x[key];
      if (!x) break;
    }
    if (x) return x;
  }
  return ar.join('.');
};

export const init = async (langs) => {
  pl = langs;
  await Promise.all(pl.map(async (l)=>{
    try {
      const res = await (await fetch(`/dist/l10n/${l}.json`)).json()
      d.set(l, res);
    } catch(e) {
      d.set(l, {});
    }
  }));
  document.body.dir = getText(['program', 'direction']);
};
