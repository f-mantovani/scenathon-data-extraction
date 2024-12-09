// @ts-nocheck
import { glob } from "glob";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";


function omit(keys, obj) {
  if (!keys.length) return obj;
  const { [keys.pop()]: omitted, ...rest } = obj;
  return omit(keys, rest);
}

(async function () {
  const filePaths = await glob(
    "./src/data/store/*-{water,food_security,ghg,land}-*.json"
  );

  for await (const path of filePaths) {
    const pathToFile = pathToFileURL(path);
    const file = (await import(pathToFile)).default;
    const final = pathToFile.pathname.split('/').at(-1)

    for await (const [index, graph] of file.entries()) {
        const max = graph.data.map((e) => {
          // console.log(e)
          const values = Object.values(omit(['valueX', 'location', 'targets', 'lowerBound', 'upperBound'], e));
          let sum = 0
          for (const number of values) {
            const toNumber = Number(number)
            if (typeof toNumber == 'number') sum += toNumber
          }
          if (sum < 0) {
            return Math.max(...values)
          }
          return sum
        })

        const flat = max.flat().map(e => +e)
        const maxNumber = Math.max(...flat)
        console.log(maxNumber)

        // console.log(max)

      // const testMax = graph.data.map((e) => {
      //   let sum = 0;
      //   if (graph.keys.length === 1) {
      //     return +e[graph.keys[0]];
      //   }

      //   if (graph.axisX == "year") {
      //     for (let i = 0; i < graph.keys.length; i++) {
      //       if (Number(e[graph.keys[i]])) {
      //         sum += +e[graph.keys[i]];
      //       }
      //     }
      //   }
      //   return sum;
      // });

      // // const max = Math.max(...testMax);
      // // if (isNaN(max)) {
      // //   continue;
      // // }
      // console.log(max2)
      graph.maxYAxis = maxNumber ? maxNumber : 'auto'
    }
    await fs.writeFile(`./src/data/tester/${final}`, JSON.stringify(file, null, 2));
  }
})();
