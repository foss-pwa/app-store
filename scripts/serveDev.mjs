import { spawn } from "child_process";
import { buildFolder, certFolder } from "../paths.mjs";
import { join } from "path";

export const serveDev = () => {
  const server = spawn('http-server', [
    buildFolder,
    '--ssl',
    '--cert',
    join(certFolder, 'device.crt'),
    '--key',
    join(certFolder, 'device.key'),
    '--port',
    '8080',
  ], {
    stdio: 'inherit',
  });
};
