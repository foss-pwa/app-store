import { dataFile, buildFolder } from "../paths.mjs";
import fs from "fs";
import yaml from "yaml";
import { join } from "path";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const dataFolder = join(buildFolder, 'dist', 'data');

const sort = (ar, cmp) => [...ar].sort(cmp);

const levels = (x) => {
  let z = 1;
  const res = [1];
  while (z <= x) {
    z *= 2;
    res.push(z);
  }
  return res;
};

const level = (x) => {
  if (x%2 === 1) return 1;
  return 2*level(x/2);
};

export const buildData = async () => {
  const data = yaml.parse((await readFile(dataFile)).toString());
  await mkdir(dataFolder, { recursive: true });
  const sd = sort(data, (x, y) => x.cs - y.cs);
  const mxcs = sd[sd.length - 1].cs + 1;
  await Promise.all(
    new Array(mxcs).fill().map(async (_, i) => {
      const l = i;
      const r = i === 0 ? mxcs : i + level(i);
      const cd = data
        .filter(({ cs }) => (l <= cs && cs < r))
        .map(({ cs, ...others }) => others);
      const path = join(dataFolder, `${i}.json`);
      await writeFile(path, JSON.stringify(cd));
    })
  );
};
