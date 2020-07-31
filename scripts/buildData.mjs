import { dataFile, buildFolder } from "../paths.mjs";
import fs from "fs";
import yaml from "yaml";
import { join } from "path";
import { promisify } from "util";

const  readFile = promisify( fs.readFile);
const writeFile = promisify(fs.writeFile);
const     mkdir = promisify(    fs.mkdir);

const dataFolder = join(buildFolder, 'dist', 'data');

export const buildData = async () => {
  const data = yaml.parse((await readFile(dataFile)).toString());
  await mkdir(dataFolder, { recursive: true });
  await writeFile(join(dataFolder, 'all.json'), JSON.stringify(data));
};
