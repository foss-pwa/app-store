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

const level = (x) => {
  if (x%2 === 1) return 1;
  return 2*level(x/2);
};

export const buildData = async () => {
  const data = yaml.parse((await readFile(dataFile)).toString());
  await mkdir(dataFolder, { recursive: true });
  const sd = sort(data, (x, y) => x.cs - y.cs);
  const mxcs = sd[sd.length - 1].cs + 1;
  const mics = sd[0].cs;
  await writeFile(join(dataFolder, 'cs.json'), JSON.stringify({ mxcs, mics }));
  await writeFile(
    join(dataFolder, '0.json'),
    JSON.stringify(data.map(({ cs, ...others }) => others)),
  );
  await Promise.all(
    new Array(mxcs - mics).fill().map(async (_, i) => {
      const l = i + mics;
      const r = l + level(l);
      const cd = data
        .filter(({ cs }) => (l <= cs && cs < r))
        .map(({ cs, ...others }) => others);
      const path = join(dataFolder, `${l}.json`);
      await writeFile(path, JSON.stringify(cd));
    }),
  );
};
