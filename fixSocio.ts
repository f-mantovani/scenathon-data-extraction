// @ts-nocheck

import fs from "node:fs/promises";
import { glob } from "glob";
import { pathToFileURL } from "node:url";

(async function () {
  const filePaths = await glob("./src/data/store/2023-socioeconomics-*.json");

  for await (const filePath of filePaths) {
    const fileUrl = pathToFileURL(filePath);

    const file = (await import(fileUrl)).default;

    file.forEach((graph) => {
      console.log(graph.title);
      if (graph.title === "Total costs of production") graph.byCost = true;
      if (graph.title === "Employment in Agriculture: Crops vs Livestock")
        graph.byVersus = true;

      if (graph.title === "Employment in Agriculture: Eat Food Groups") graph.byProduct = true;
    });
    const final = fileUrl.pathname.split('/').at(-1)
    await fs.writeFile(`./src/data/tester/${final}`, JSON.stringify(file, null, 2))
  }
})();
