// @ts-nocheck
import fs from "node:fs/promises";
import { locationConverter } from "./src/data/helpers/locationConverter";
const ghgPath = "./src/data/store/2019-ghg-CT-Yes.json";

const ghgTargetsURL =
  "https://fableapi.geo-wiki.org/GlobalghgEtarget%7B%22select%22:%7B%22GraficaType%22:%22group%22,%22scenathon_id%22:%225%22,%22iteration%22:%222%22,%22Year%22:%222030%22,%22ScenathonYear%22:%222019%22%7D%7D";

const emissionFromCropsAndLucURL =
  "https://fableapi.geo-wiki.org/gas2%7B%22select%22:%7B%22GraficaType%22:%22group%22,%22scenathon_id%22:%228%22,%22iteration%22:%224%22,%22ScenathonYear%22:%222021%22%7D%7D";
(async function () {
  const ghgData = (await import(ghgPath)).default;
  const ghgTargets = await (await fetch(ghgTargetsURL)).json();
  console.log(ghgTargets.queryResponse[0])
  console.log('======= divider ==========')
  ghgData[0].data = ghgTargets.queryResponse.map((dataPoint) => {
    const newObj = {
      valueX: dataPoint.Year ?? dataPoint.year,
      "Total GHG Agriculture": dataPoint.Total_GHG_agric,
      "Livestock CH4": dataPoint.Livestock_CH4,
      "Livestock N2O": dataPoint.Livestock_N20,
      "Crop N2O": dataPoint.Crop_N20,
      "Crop CH4": dataPoint.Crop_CH4,
      "Crop CO2": dataPoint.Crop_CO2,
      // Biofuel: dataPoint.GHG_BIOFUEL,
    };

    if (dataPoint.FAO_GHGagric && dataPoint.FAO_GHGagric != '0.00') {
      newObj["FAO Agric global"] = dataPoint.FAO_GHGagric;
    }

    // if (dataPoint.Year == 2050) {
    //   newObj.targets = [
    //     {
    //       value: 4,
    //       byYear: 2050,
    //     },
    //   ];
    // }

    return newObj;
  });
  // ghgData[0].withTarget = true;

  ghgData[1].data = ghgTargets.queryResponse.map((data) => {
    const newObj = {
      valueX: data.Year ?? data.year,
      "Total GHG Land": data.total_GHG_land,
      "Forest loss": data.deforestation,
      "Other LUC": data.Other_LUC,
      Sequestration: data.sequestration,
      Peat: data.peat,
    };

    if (data.fao_ghg_lu && data.fao_ghg_lu != "0.00") {
      newObj["FAO LU global"] = data.fao_ghg_lu;
    }

    // if (data.Year == 2050) {
    //   newObj.targets = [
    //     {
    //       value: 0,
    //       byYear: 2050,
    //     },
    //   ];
    // }

    return newObj;
  });
  // ghgData[1].withTarget = true;

  // const emissionFromCropsAndLuc = await (
  //   await fetch(emissionFromCropsAndLucURL)
  // ).json();

  // const cropsEmission = [];
  // emissionFromCropsAndLuc.queryResponse.forEach((data) => {
  //   const index = cropsEmission.findIndex((a) => a.valueX == data.Year);

  //   if (index < 0) {
  //     const newObj = {
  //       valueX: data.Year,
  //       [locationConverter[data["Country"]]]: data.AgriCO2e,
  //     };
  //     cropsEmission.push(newObj);
  //   } else {
  //     cropsEmission[index] = {
  //       ...cropsEmission[index],
  //       [locationConverter[data["Country"]]]: data.AgriCO2e,
  //     };
  //   }
  // });
  // ghgData[2].data = cropsEmission;

  // const landEmission = [];
  // emissionFromCropsAndLuc.queryResponse.forEach((data) => {
  //   const index = landEmission.findIndex((a) => a.valueX == data.Year);

  //   if (index < 0) {
  //     const newObj = {
  //       valueX: data.Year,
  //       [locationConverter[data["Country"]]]: data.LandCO2e,
  //     };
  //     landEmission.push(newObj);
  //   } else {
  //     landEmission[index] = {
  //       ...landEmission[index],
  //       [locationConverter[data["Country"]]]: data.LandCO2e,
  //     };
  //   }
  // });
  // ghgData[3].data = landEmission;
  return ghgData;
})()
  .then(async (ghgData) => {
    return fs.writeFile(ghgPath, JSON.stringify(ghgData, null, 2));
    console.log(ghgData[1].data)
    return "Didn't wrote on file"
  })
  .then((result) => {
    console.log(result);
    console.log(`Finished with ${ghgPath}`);
  });
