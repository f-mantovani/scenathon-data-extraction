import { fs, glob, pathToFileURL, type Base } from "./writeHelper";

(async function () {
  const allPaths = await glob("./src/data/store/*-trade-*.json");

  for await (const path of allPaths) {
    const { pathname } = pathToFileURL(path);
    const final = path.split("/").at(-1);
    const year = Number(final?.split("-")[0]);
    const file = (await import(pathname)).default;

    file.forEach((el: Base, i: number) => {
      if (year === 2023) {
        const keys = Object.keys(el.data);
        keys.forEach((key) => {
          const product = el.data[key];
          product.forEach((p) => delete p.WORLD);
        });
      }

      if (i === 0) {
        el.title = 'Trade report import'
      }

      if (i === 1) {
        el.title = 'Trade report export'
      }
    });

    await fs.writeFile(`./src/data/tester/${final}`, JSON.stringify(file, null, 2))
  }

})();
