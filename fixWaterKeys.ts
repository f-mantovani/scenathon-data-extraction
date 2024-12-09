// @ts-nocheck

import fs from "node:fs/promises";
import { glob } from "glob";
import { pathToFileURL } from "node:url";
import { sortByCountryKeys } from "./src/data/helpers/sortByYear";

(async function () {
  const filePaths = await glob("./src/data/store/*-water-*.json");

  for await (const filePath of filePaths) {
    const fileUrl = pathToFileURL(filePath);

    const file = (await import(fileUrl)).default;

    file.forEach((graph) => {
      if (!graph.byCountry) return;

      const newKeys = new Set();

      graph.data.forEach((entry) => {
        const keys = Object.keys(entry);
        keys.forEach((key) => {
          if (key == "valueX") return;

          if (newKeys.has(key)) return;

          newKeys.add(key);
        });
      });
      graph.keys = sortByCountryKeys([...newKeys]);
    });

    const final = fileUrl.pathname.split("/").at(-1);
    await fs.writeFile(
      `./src/data/tester/${final}`,
      JSON.stringify(file, null, 2)
    );
  }
})();
