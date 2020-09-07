import { buildData } from "./buildData.mjs";
import fs from "fs";
import { promisify } from "util";
import { buildFolder, srcFolder } from "../paths.mjs";
import { join } from "path";
import { fileMap } from "./fileMap.mjs";
import { developmentCompiler } from "./webpackCompiler.mjs";
import yaml from "yaml";
import { serveDev } from "./serveDev.mjs";

const symlink = promisify(fs.symlink);
const mkdir = promisify(fs.mkdir);
const rmdir = promisify(fs.rmdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dist = join(buildFolder, 'dist');

const refresh = async () => {
  let firstTime = true;
  while (true) {
    await Promise.all(fileMap.map(async ({ from, to }) => {
      const f = join(srcFolder, from);
      const t = join(buildFolder, to);
      if (from.endsWith('.yml')) {
        const data = yaml.parse((await readFile(f)).toString());
        await writeFile(t, JSON.stringify(data));
      } else {
        if (firstTime) await symlink(f, t);
      }
    }));
    firstTime = false;
    await new Promise(res=>setTimeout(res, 2000));
  }
};

const dev = async () => {
  await rmdir(buildFolder, { recursive: true });
  await mkdir(join(dist, 'l10n'), { recursive: true });
  await buildData();
  refresh();
  developmentCompiler.watch({
    ignores: /node_modules/,
  }, (err, stats) => {
    if (err) {
      console.log(err);
    }
    if (stats.hasErrors()) {
      console.log(stats.toString({ colors: true }));
    }
  });
  serveDev();
};

dev();