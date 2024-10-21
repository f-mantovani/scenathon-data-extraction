import { promises as fsp } from "fs";

import completeData from "../../2023-data-full.json";
import productsData from "../../2023-products-data-full.json";
import targets2021 from "../../2021-data-full.json";
import targets2020 from "../../2020-data-test.json";
import targets2019 from "../../2019-data-full.json";
import products2020 from '../../2020-products-data-full.json';
import worldForestData21 from "../../2021-forestData-world.json";
import worldForestData20 from "../../2020-forestData-world.json";
import worldForestData19 from "../../2019-forestData-world.json";
import type { Identifiers } from "./helpers/identifier";
import { formatter } from "./helpers/formatter";
import { filtering } from "./helpers/filtering";
import { goalIdentifier } from "./helpers/goalIdentifier";

export async function sendDataAndWriteToFile({
  pathway,
  adjustment,
  identifier,
  year = 2023,
}: {
  pathway: "CT" | "NC" | "GS";
  adjustment: "Yes" | "No";
  year: number;
  identifier: Identifiers;
}) {
  let filter: any[];

  if (year == 2023) {
    filter =
      identifier !== "socioeconomics"
        ? (completeData as Array<any>).filter((d: any) =>
            filtering(d, pathway, adjustment)
          )
        : (productsData as Array<any>).filter((d: any) =>
            filtering(d, pathway, adjustment)
          );
  }

  if (year == 2021) {
    filter =
      identifier !== "socioeconomics"
        ? (targets2021 as Array<any>).filter((d: any) =>
            filtering(d, pathway, adjustment)
          )
        : (productsData as Array<any>).filter((d: any) =>
            filtering(d, pathway, adjustment)
          );
  }

  if (year == 2020) {
    filter =
      identifier !== "socioeconomics"
        ? (targets2020 as Array<any>).filter((d: any) =>
            filtering(d, pathway, adjustment)
          )
        : (products2020 as Array<any>).filter((d: any) =>
            filtering(d, pathway, adjustment)
          );
  }

  if (year == 2019) {
    filter =
      identifier !== "socioeconomics"
        ? (targets2019 as Array<any>)
        : (productsData as Array<any>).filter((d: any) =>
            filtering(d, pathway, adjustment)
          );
  }
  // @ts-expect-error
  const keyArray = goalIdentifier[year][identifier];
  let formatted: any[] = keyArray?.map((i: Identifiers) => {
    if (i === "forest_change" && year == 2021) {
      return formatter(
        worldForestData21.find((d: any) => filtering(d, pathway, adjustment))!
          .data,
        i
      );
    }
    if (i === "forest_change" && year == 2020) {
      return formatter(
        worldForestData20.find((d: any) => filtering(d, pathway, adjustment))!
          .data,
        i
      );
    }
    if (i === "forest_change" && year == 2019) {
      return formatter(worldForestData19, i);
    }
    return formatter(filter, i);
  });
  // console.log(formatted);
  // return
  // console.log(formatted);
  // // return;

  await fsp
    .writeFile(
      `./src/data/store/${year}-${identifier}-${pathway}-${adjustment}.json`,
      JSON.stringify(formatted, null, 2)
    )
    .catch((e) => console.error(`Something went wrong: ${e}`));
  // await fsp
  //   .writeFile(
  //     `./src/data/tester/${year}-${identifier}-${pathway}-${adjustment}.json`,
  //     JSON.stringify(formatted, null, 2)
  //   )
  //   .catch((e) => console.error(`Something went wrong: ${e}`));
  return formatted;
}
