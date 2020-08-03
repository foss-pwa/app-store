import path from "path";
export const rootFolder = path.dirname(new URL(import.meta.url).pathname);
export const buildFolder = path.join(rootFolder, 'public');
export const srcFolder = path.join(rootFolder, 'src');
export const certFolder = path.join(rootFolder, 'cert');
export const dataFile = path.join(rootFolder, 'data.yml');
