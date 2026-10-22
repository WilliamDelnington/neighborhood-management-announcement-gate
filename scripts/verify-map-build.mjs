import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const assets = join(process.cwd(), "dist", "assets");
const files = readdirSync(assets);
const worker = files.find(name => /^maplibre-gl-worker-.*\.js$/.test(name));
if (!worker || statSync(join(assets, worker)).size < 1000) {
  throw new Error("Map worker missing from production build. Publish the entire dist/assets folder.");
}
const referencesWorker = files.some(name => name.endsWith(".js") && name !== worker && readFileSync(join(assets, name), "utf8").includes(worker));
if (!referencesWorker) throw new Error("Map worker is not referenced by the production map bundle.");
console.log(`Verified production map worker: ${worker}`);
