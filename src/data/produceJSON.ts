import { promises as fsp } from "fs";


import completeData from "../../data-full.json";
import { mapper } from "./helpers/mapper";
import type { Identifiers } from "./helpers/identifier";
import { formatter } from "./helpers/formatter";
import { filtering } from "./helpers/filtering";


export async function writeToFile({
  pathway,
  adjustment,
  year,
  identifier,
  region,
}: {
  pathway: "CT" | "NC" | "GS";
  adjustment: "Yes" | "No";
  year?: number | string;
  identifier: Identifiers;
  region?: string;
}) {
  const filter = completeData.filter((d: any) =>
    filtering(d, pathway, adjustment, year, region)
  );

  const formatted = [formatter(filter, "undernourishment", region), formatter(filter, "average_calories", region), formatter(filter, "undernourishment_by_country", region), formatter(filter, "calories_by_country", region)];

  await fsp.writeFile(`data-formatted.json`, JSON.stringify(formatted, null, 2)).catch(e => console.error(`Something went wrong: ${e}`));
  return formatted;
}

