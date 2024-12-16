import data from "./2020-data-full.json";
import { promises as fsp } from "node:fs";
import { locationConverter } from "./src/data/helpers/locationConverter";
// import biodiversityData from "./2020-biodiversityData.json";
// import forestData from "./2021-forestData-country.json";

(async () => {
  data.forEach((d) => {
    d.year = d.Year;
    // @ts-expect-error
    d.location = locationConverter[d.Country_1];
    d.pathway_id = d.Pathway === "CT" ? "CT" : "GS";
    d.tradeadjustment = d.TradeAdjustment;
    d.water_requirement = d.CalcWFblue;
    //@ts-expect-error
    d.location = locationConverter[d.Country];

    // const biodiversitySlice = biodiversityData.find(
    //   (c: any) =>
    //     c.tradeadjustment === d.tradeadjustment && c.pathway_id === d.pathway_id
    // );

    // //  Placing the biodiversity data from the 2021 scenathon website
    // const biodiversityTarget = biodiversitySlice?.data.find(
    //   (c: any) =>
    //     //@ts-expect-error
    //   locationConverter[c.Country] === locationConverter[d.Country] &&
    //   c.Year === d.Year
    // );
    // //@ts-expect-error
    // d.biodiversity_land = biodiversityTarget?.Protected_land ?? 0;

    // //  Placing the NetForestChange data from the 2021 scenathon website
    // const forestTarget = forestData.find(
    //   (c: any) =>
    //     c.pathway_id === d.pathway_id && c.tradeadjustment === d.tradeadjustment
    // );
    // const forestDataCountry = forestTarget?.data.find(
    //   (c: any) =>
    //     // @ts-expect-error
    //     locationConverter[c.Country] === locationConverter[d.Country] &&
    //     c.Year === d.Year
    // );

    // d.NetForestChange = forestDataCountry?.NetForestChange ?? 0;

    // //  Might need to duplicate the data for India (AFTER)
    // if (d.location === "IND" && d.tradeadjustment === "No") {
    //   console.log(d);
    //   const indiaAfter = { ...d, tradeadjustment: "Yes" };
    //   const findIndia = data.find(
    //     (d) =>
    //       d.location === "IND" &&
    //       d.tradeadjustment === indiaAfter.tradeadjustment &&
    //       d.year === indiaAfter.year &&
    //       d.pathway_id === indiaAfter.pathway_id
    //   );
    //   if (!findIndia) {
    //     data.push(indiaAfter);
    //   }
    // }
  });

  await fsp
    .writeFile("2020-data-full.json", JSON.stringify(data, null, 2))
    .catch((e) => console.error(`Something went wrong: ${e}`));
})();
