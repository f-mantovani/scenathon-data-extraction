import { promises as fsp } from "fs";

const locations = [
  "ARG",
  "AUS",
  "BRA",
  "CAN",
  "CHN",
  "COL",
  "DEU",
  "DNK",
  "ETH",
  "FIN",
  "GRC",
  "IND",
  "IDN",
  "MEX",
  "NPL",
  "NOR",
  "RUS",
  "RWA",
  "SWE",
  "TUR",
  "GBR",
  "USA",
  "R_ASP",
  "R_CSA",
  "R_NMC",
  "R_NEU",
  "R_OEU",
  "R_SSA",
  "WORLD",
];

import data from './trends-adjustments.json'

async function main() {
  const combinations: any[] = [];
  locations.forEach((location) => {
    data.forEach(({ pathway, adjustement }) => {
      combinations.push({ pathway, location, adjustement });
    });
  });
  fsp.writeFile(
    "trends-adjustements-countries.json",
    JSON.stringify(combinations, null, 2)
  );
}

main();
