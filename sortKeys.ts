// @ts-nocheck
// Sort the keys of the data before sending

import { glob } from "glob";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { locationConverter } from "./src/data/helpers/locationConverter";
import { sortByCountryKeys } from "./src/data/helpers/sortByYear";
import fs from "node:fs/promises";

(async function () {
  const files = await glob(`./src/data/store/*.json`);

  for await (const file of files) {
    const filePath = pathToFileURL(file);

    const fileImported = (await import(filePath)).default;
    fileImported.forEach((graph) => {
      if (!locationConverter[graph.keys[0]]) return;

      sortByCountryKeys(graph.keys);
    });

    await fs.writeFile(filePath, JSON.stringify(fileImported, null, 2));
  }
})();
