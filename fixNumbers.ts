// @ts-nocheck

import { glob } from "glob";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";

(async function () {
  const allFiles = (await glob("./src/data/store/*.json"))
  .filter(
    (file) => !file.includes("socioeconomics") && !file.includes("trade")
  );

  for await (const filePather of allFiles) {
    const filePath = pathToFileURL(filePather);
    const file = (await import(filePath)).default;

    file.forEach((graph, i) => {
      graph.data.forEach((e) => {
        Object.keys(e).forEach((key) => {
          const value = e[key];
          if (!isNaN(Number(value)) && value !== null && value !== "") {
            e[key] = Number(value);
          }
        });
      });
    });
    const final = filePath.pathname.split('/').at(-1)
    await fs.writeFile(`./src/data/tester/${final}`, JSON.stringify(file, null, 2))
}

  
})();
