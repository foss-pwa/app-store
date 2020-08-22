const sizeToArray = (sizes) => sizes.split(' ').map((x) => Number(x.split('x')[0]));
const maxSize = (sizes) => sizeToArray(sizes).reduce((a, b) => Math.max(a, b));

export const bestFitIcon = (icons, size) => {
  const ic = icons.map((x)=>({
    ...x, size: maxSize(x.sizes),
  }));
  const goods =  ic.filter((x) => x.size >= size);
  if (goods.length === 0) {
    return ic.reduce((a, b) => a.size > b.size ? a : b).src;
  }
  return goods.reduce((a, b) => a.size > b.size ? b : a).src;
};
