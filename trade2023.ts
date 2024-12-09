// @ts-nocheck
import fs from "node:fs/promises";
import rawData from "./2023-products-data-full.json";
import { locationConverter } from "./src/data/helpers/locationConverter";
import productExample from './src/data/store/2021-trade-CT-Yes.json'

const year = 2023;
const paths = ["CT", "GS", "NC"];
const trades = ["No", "Yes"];
const products = [
  "abaca",
  "apple",
  "banana",
  "barley",
  "beans",
  "beef",
  "cassava",
  "cereal_other",
  "chicken",
  "citrus_other",
  "clove",
  "cocoa",
  "coconut",
  "cocooil",
  "coffee",
  "corn",
  "cottcake",
  "cottlint",
  "cottoil",
  "cotton",
  "date",
  "eggs",
  "fiber_hard_other",
  "fiber_soft_other",
  "fruit_other",
  "grape",
  "grapefruit",
  "groundnut",
  "groundnutcake",
  "groundnutoil",
  "honey",
  "jute",
  "lemon",
  "meat_other",
  "milk",
  "millet",
  "mutton_goat",
  "nuts",
  "oats",
  "oilpalmfruit",
  "oilseed_other",
  "olive",
  "oliveoil",
  "onion",
  "orange",
  "other_oil",
  "other_olscake",
  "palmkernelcake",
  "palmkerneloil",
  "palm_oil",
  "peas",
  "pepper",
  "piment",
  "pinapple",
  "plantain",
  "pork",
  "potato",
  "pulses_other",
  "rapecake",
  "rapeoil",
  "rapeseed",
  "rice",
  "rubber",
  "rye",
  "sesame",
  "sesamoil",
  "sisal",
  "sorghum",
  "soyabean",
  "soycake",
  "soyoil",
  "spices_other",
  "sugarbeet",
  "sugarcane",
  "sugarraw",
  "sunflcake",
  "sunfloil",
  "sunflower",
  "sweet_potato",
  "tea",
  "tobacco",
  "tomato",
  "tuber_other",
  "vegetable_other",
  "wheat",
  "yams",
];

(async function () {
  for await (const path of paths) {
    for (const trade of trades) {
      const importData = {};
      const exportData = {};
      const filteredData = rawData.filter(
        (e) => e.pathway_id == path && e.tradeadjustment == trade
      );
      const writePath = `./src/data/store/${year}-trade-${path}-${trade}.json`;

      for (const product of products) {
        filteredData.filter(e => e.product == product).forEach((data) => {
          const importExport = +data.import_quantity - +data.export_quantity;
          if (!importExport) return;

          if (importExport > 0) {
            if (product in importData) {
              const index = importData[product].findIndex(
                (p) => p.valueX == data.year
              );
              if (index < 0) {
                importData[product].push({
                  valueX: data.year,
                  [data.location]: importExport,
                });
              } else {
                importData[product][index] = {
                  ...importData[product][index],
                  [data.location]: importExport,
                };
              }
            } else {
              importData[product] = [
                {
                  valueX: data.year,
                  [data.location]: importExport,
                },
              ];
            }
          }

          if (importExport < 0) {
            if (product in exportData) {
              const index = exportData[product].findIndex(
                (p) => p.valueX == data.year
              );
              if (index < 0) {
                exportData[product].push({
                  valueX: data.year,
                  [data.location]: importExport * -1,
                });
              } else {
                exportData[product][index] = {
                  ...exportData[product][index],
                  [data.location]: importExport * -1,
                };
              }
            } else {
              exportData[product] = [
                {
                  valueX: data.year,
                  [data.location]: importExport * -1,
                },
              ];
            }
          }
        });

      }
      Object.values(importData).forEach((product) => {
        product.sort((a, b) => a.valueX - b.valueX);
      });

      Object.values(exportData).forEach((product) => {
        product.sort((a, b) => a.valueX - b.valueX);
      });
      productExample[0].data = importData;
      productExample[1].data = exportData;
      await fs.writeFile(writePath, JSON.stringify(productExample, null, 2))
    }
  }
  console.log('done')
})();
