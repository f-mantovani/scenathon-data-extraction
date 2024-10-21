import data from "./2020-products-data-full.json";
import { promises as fsp } from "node:fs";
import { locationConverter } from "./src/data/helpers/locationConverter";

(async () => {
  data.forEach((d) => {
    d.year = d.Year;
    d.pathway_id = d.Pathway === "CT" ? "CT" : "GS";
    d.tradeadjustment = d.TradeAdjustment;
    //@ts-expect-error
    d.location = locationConverter[d.Country.trim()];

  });

  await fsp
    .writeFile("2020-products-data-full.json", JSON.stringify(data, null, 2))
    .catch((e) => console.error(`Something went wrong: ${e}`));
})();
