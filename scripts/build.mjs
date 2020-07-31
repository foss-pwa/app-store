import { buildData } from "./buildData.mjs";
import fs from "fs";
import { promisify } from "util";
import { buildFolder } from "../paths.mjs";

const mkdir = promisify(fs.mkdir);
const rmdir = promisify(fs.rmdir);

const build = async () => {
  await rmdir(buildFolder, { recursive: true });
  await mkdir(buildFolder);
  await buildData();
};

build();
