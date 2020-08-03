import { buildData } from "./buildData.mjs";
import fs from "fs";
import { promisify } from "util";
import { buildFolder, srcFolder, certFolder } from "../paths.mjs";
import { join } from "path";
import { fileMap } from "./fileMap.mjs";
import { developmentCompiler } from "./webpackCompiler.mjs";
import { spawn } from "child_process";
import yaml from "yaml";

const symlink = promisify(fs.symlink);
const mkdir = promisify(fs.mkdir);
const rmdir = promisify(fs.rmdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dist = join(buildFolder, 'dist');

const dev = async () => {
  await rmdir(buildFolder, { recursive: true });
  await mkdir(dist, { recursive: true });
  await buildData();
  await Promise.all(fileMap.map(async ({ from, to }) => {
    const f = join(srcFolder, from);
    const t = join(buildFolder, to);
    if (from.endsWith('.yml')) {
      const data = yaml.parse((await readFile(f)).toString());
      await writeFile(t, JSON.stringify(data));
    } else {
      await symlink(f, t);
    }
  }));
  developmentCompiler.watch({
    ignores: /node_modules/,
  }, (err, stats) => {
  });
  const server = spawn('http-server', [
    buildFolder,
    '--ssl',
    '--cert',
    join(certFolder, 'device.crt'),
    '--key',
    join(certFolder, 'device.key'),
  ]);
  server.on('stderr', console.error);
  server.on('stdout', console.log);
};

dev();