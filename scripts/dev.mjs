import { buildData } from "./buildData.mjs";
import fs from "fs";
import { promisify } from "util";
import { buildFolder, srcFolder } from "../paths.mjs";
import { join } from "path";
import { fileMap } from "./fileMap.mjs";
import { developmentCompiler } from "./webpackCompiler.mjs";
import { spawn } from "child_process";

const symlink = promisify(fs.symlink);
const mkdir = promisify(fs.mkdir);
const rmdir = promisify(fs.rmdir);

const dist = join(buildFolder, 'dist');

const dev = async () => {
  await rmdir(buildFolder, { recursive: true });
  await mkdir(dist, { recursive: true });
  await buildData();
  await Promise.all(fileMap.map(async ({ from, to }) => {
    const f = join(srcFolder, from);
    const t = join(buildFolder, to);
    await symlink(f, t);
  }));
  developmentCompiler.watch({
    ignores: /node_modules/,
  }, (err, stats) => {
  });
  const server = spawn('http-server', [buildFolder]);
};

dev();