// @ts-nocheck
import fs from "node:fs/promises";

(async function () {
  const years = [2019, 2020, 2021];
  const paths = ["CT", "GS"];
  const trades = ["No", "Yes"];

  let importPath;
  let file;

  for await (const year of years) {
    for (const path of paths) {
      for (const trade of trades) {
        importPath = `./src/data/store/${year}-trade${year == 2019 ? "" : "-" + path}-${trade}.json`;
        file = (await import(importPath)).default;
        file.forEach((point) => {
            Object.values(point.data).forEach((product) => {
                product.sort((a, b) => a.valueX - b.valueX);
            });
        });
        console.log(importPath);
        await fs.writeFile(importPath, JSON.stringify(file, null, 2))
      }
    }
  }

})();
