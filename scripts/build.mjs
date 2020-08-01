import { buildData } from "./buildData.mjs";
import fs from "fs";
import { promisify } from "util";
import { buildFolder, srcFolder } from "../paths.mjs";
import { join } from "path";
import { fileMap } from "./fileMap.mjs";
import { productionCompiler as compiler } from "./webpackCompiler.mjs";

const mkdir = promisify(fs.mkdir);
const rmdir = promisify(fs.rmdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const minifyJSON = async (from, to) => {
  const data = JSON.parse((await readFile(from)).toString());
  await writeFile(to, JSON.stringify(data));
};

const dist = join(buildFolder, 'dist');

const build = async () => {
  await rmdir(buildFolder, { recursive: true });
  await mkdir(dist, { recursive: true });
  await Promise.all(fileMap.map(async ({ from, to }) => {
    const f = join(srcFolder, from);
    const t = join(buildFolder, to);
    if (from.endsWith('.json')) {
      const data = JSON.parse((await readFile(f)).toString());
      await writeFile(t, JSON.stringify(data));
    } else {
      await writeFile(t, await readFile(f));
    }
  }));
  await new Promise((res, rej) => {
    compiler.run((err, stats) => { // Stats Object
      if (err) {
        rej(err);
      }
      console.log(stats.toString({ colors: true }));
      if (stats.hasErrors()) {
        process.exit(0);
        rej();
      }
      res();
    });
  });
  await buildData();
};

build();
