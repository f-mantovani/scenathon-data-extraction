// @ts-nocheck
import { locationConverter } from "./src/data/helpers/locationConverter";
import waterData from "./src/data/store/2021-water-CT-No.json";
import fs from "node:fs/promises";

(async function () {
  const worldWater = await (
    await fetch(
      "https://fableapi.geo-wiki.org/freshwater%7B%22select%22:%7B%22GraficaType%22:%22group%22,%22scenathon_id%22:%228%22,%22iteration%22:%224%22,%22ScenathonYear%22:%222021%22%7D%7D"
    )
  ).json();

  waterData[0].data = worldWater.queryResponse.map(({ Year, BlueWater }) => ({
    valueX: Year,
    "Blue water": BlueWater,
  }));

  const byCountryWater = await (
    await fetch(
      "https://fableapi.geo-wiki.org/qFreshwaterBycountry%7B%22select%22:%7B%22GraficaType%22:%22group%22,%22scenathon_id%22:%228%22,%22iteration%22:%224%22,%22ScenathonYear%22:%222021%22%7D%7D"
    )
  ).json();

  const newCountryWater = [];

  byCountryWater.queryResponse.forEach((data) => {
    let found = newCountryWater.findIndex((a) => a.valueX == data.Year);

    if (found < 0) {
      const newObj = {
        valueX: data.Year,
        [locationConverter[[data["Country"]]]]: data.BlueWater,
      };
      newCountryWater.push(newObj);
    } else {
      newCountryWater[found] = {
        ...newCountryWater[found],
        [locationConverter[[data["Country"]]]]: data.BlueWater,
      };
    }
  });

  waterData[1].data = newCountryWater;

  console.log(waterData[0].data);
  console.log("============== divider =======================");
  console.log(waterData[1].data);
  await fs.writeFile(
    "./src/data/store/2021-water-CT-No.json",
    JSON.stringify(waterData, null, 2)
  );
})();
