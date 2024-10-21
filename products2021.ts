// @ts-nocheck
import fs from "node:fs/promises";
import productsData from "./src/data/store/2020-socioeconomics-CT-Yes.json";
import { locationConverter } from "./src/data/helpers/locationConverter";

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
  "cottlint",
  "cottoil",
  "cotton",
  "date",
  "eggs",
  "fruit_other",
  "grape",
  "grapefruit",
  "groundnut",
  "groundnutoil",
  "jute",
  "lemon",
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

/*
    For 2019:
        - Iteration 5 means after
        - Iteration 50 means before
*/

(async function () {
  const importData = {};
  const exportData = {};

  // This part will need to be inside a loop to fetch all the different possibilities
  // The loop changes the product and then we fetch the data and create the arrays inside of the objects
  for await (const product of products) {
    const productsLink =
      `https://fableapi.geo-wiki.org/tradeReport%7B%22select%22:%7B%22product%22:%22${product}%22,%22iteration%22:%2250%22,%22ScenathonYear%22:%222019%22%7D%7D`;
    const data = (await (await fetch(productsLink)).json()).queryResponse;
    data.forEach((data) => {
      const importExport = +data.Import_quantity - +data.Export_quantity;
      if (!importExport) return;

      if (importExport > 0) {
        if (product in importData) {
          const index = importData[product].findIndex(
            (p) => p.valueX == data.Year
          );
          if (index < 0) {
            importData[product].push({
              valueX: data.Year,
              [locationConverter[data.name]]: importExport,
            });
          } else {
            importData[product][index] = {
              ...importData[product][index],
              [locationConverter[data.name]]: importExport,
            };
          }
        } else {
          importData[product] = [
            { valueX: data.Year, [locationConverter[data.name]]: importExport },
          ];
        }
      }

      if (importExport < 0) {
        if (product in exportData) {
          const index = exportData[product].findIndex(
            (p) => p.valueX == data.Year
          );
          if (index < 0) {
            exportData[product].push({
              valueX: data.Year,
              [locationConverter[data.name]]: importExport * -1,
            });
          } else {
            exportData[product][index] = {
              ...exportData[product][index],
              [locationConverter[data.name]]: importExport * -1,
            };
          }
        } else {
          exportData[product] = [
            {
              valueX: data.Year,
              [locationConverter[data.name]]: importExport * -1,
            },
          ];
        }
      }
    });
  }

  productsData[0].data = importData
  productsData[1].data = exportData
  return productsData
})().then((data) => {
    console.log(data[0]?.data.banana)
    return fs.writeFile('./src/data/store/2019-trade-No.json', JSON.stringify(data, null, 2))
}).then((result) => {
    console.log(result)
    console.log('Finished working in that one')
})
