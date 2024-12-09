// @ts-nocheck
import fs from "node:fs/promises";
import { locationConverter } from "./src/data/helpers/locationConverter";

const products2019 = [
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

const products2020And2021 = [
  "abaca",
  "apple",
  "banana",
  "barley",
  "Barley",
  "BarleyOrg",
  "beans",
  "beef",
  "cassava",
  "cattle",
  "cereal_other",
  "cereal_otherOrg",
  "chicken",
  "chickens",
  "chips_and__particles",
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
  "mech_pulp",
  "milk",
  "millet",
  "mutton_goat",
  "nuts",
  "oats",
  "OatsOrg",
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
  "pigs",
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
  "RyeOrg",
  "sesame",
  "sesamoil",
  "sheep_goats",
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
  "TriticaleOrg",
  "tuber_other",
  "vegetable_other",
  "wheat",
  "WheatOrg",
  "yams",
];

/*
    For 2019:
        - Iteration 5 means after
        - Iteration 50 means before
    baseURL:  "https://fableapi.geo-wiki.org/tradeReport%7B%22select%22:%7B%22product%22:%22abaca%22,%22iteration%22:%225%22,%22ScenathonYear%22:%222019%22%7D%7D"
*/

//  links for 2021
function links2021(path, product) {
  const links = {
    "GS-Yes": `https://fableapi.geo-wiki.org/tradeReport%7B%22select%22:%7B%22scenathon_id%22:%227%22,%22iteration%22:%221%22,%22ScenathonYear%22:%222021%22,%22product%22:%22${product}%22%7D%7D`,
    "GS-No": `https://fableapi.geo-wiki.org/tradeReport%7B%22select%22:%7B%22scenathon_id%22:%227%22,%22iteration%22:%222%22,%22ScenathonYear%22:%222021%22,%22product%22:%22${product}%22%7D%7D`,
    "CT-Yes": `https://fableapi.geo-wiki.org/tradeReport%7B%22select%22:%7B%22scenathon_id%22:%228%22,%22iteration%22:%221%22,%22ScenathonYear%22:%222021%22,%22product%22:%22${product}%22%7D%7D`,
    "CT-No": `https://fableapi.geo-wiki.org/tradeReport%7B%22select%22:%7B%22scenathon_id%22:%228%22,%22iteration%22:%224%22,%22ScenathonYear%22:%222021%22,%22product%22:%22${product}%22%7D%7D`,
  };

  return links[path];
}

function links2020(path, product) {
  const links = {
    "GS-Yes": `https://fableapi.geo-wiki.org/tradeReport%7B%22select%22:%7B%22scenathon_id%22:%225%22,%22iteration%22:%222%22,%22ScenathonYear%22:%222020%22,%22product%22:%22${product}%22%7D%7D`,
    "GS-No": `https://fableapi.geo-wiki.org/tradeReport%7B%22select%22:%7B%22scenathon_id%22:%225%22,%22iteration%22:%222%22,%22ScenathonYear%22:%222020%22,%22product%22:%22${product}%22%7D%7D`,
    "CT-Yes": `https://fableapi.geo-wiki.org/tradeReport%7B%22select%22:%7B%22scenathon_id%22:%226%22,%22iteration%22:%224%22,%22ScenathonYear%22:%222020%22,%22product%22:%22${product}%22%7D%7D`,
    "CT-No": `https://fableapi.geo-wiki.org/tradeReport%7B%22select%22:%7B%22scenathon_id%22:%226%22,%22iteration%22:%223%22,%22ScenathonYear%22:%222020%22,%22product%22:%22${product}%22%7D%7D`,
  };

  return links[path];
}

const identifiers = "CT-Yes"
const productsPath = `./src/data/store/2020-trade-${identifiers}.json`;


(async function () {
  const importData = {};
  const exportData = {};
  const productsData = (await import(productsPath)).default;
  // This part will need to be inside a loop to fetch all the different possibilities
  // The loop changes the product and then we fetch the data and create the arrays inside of the objects
  for await (const product of products2020And2021) {
    const productsLink = links2020(identifiers, product);
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

  productsData[0].data = importData;
  productsData[1].data = exportData;
  return productsData;
})()
  .then((data) => {
    console.log(data[0].data.banana)
    // return fs.writeFile(productsPath, JSON.stringify(data, null, 2));
    return "Didn't wrote on file";
  })
  .then((result) => {
    console.log(result);
    console.log(`Finished working in that one ${productsPath}`);
  });
