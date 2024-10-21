import data from "./2019-data-full.json";
import { promises as fsp } from "node:fs";
import { locationConverter } from "./src/data/helpers/locationConverter";
// import biodiversityData from "./biodiversityData.json";
// import forestData from "./2021-forestData-country.json";

(async () => {
  data.forEach((d) => {
    // @ts-expect-error
    d.location = locationConverter["country_alpha2"];
    d.tradeadjustment = d["trade_adjustment"] === "yes" ? "Yes" : "No";
    d.CalcAllAgriCO2e = d["total_agri_CO2e"];
    d.CalcLiveCH4 = d["livestock_CH4"];
    d.CalcLiveN2O = d["livestock_N2O"];
    d.CalcCropN2O = d["crops_N2O"];
    d.CalcCropCH4 = d["crops_CH4"];
    d.CalcCropCO2 = d["crops_CO2"];
    // //  Placing the biodiversity data from the 2021 scenathon website
    // const biodiversityTarget = biodiversityData.find(
    //   (c: any) =>
    //     //@ts-expect-error
    //     locationConverter[c.Country] === locationConverter[d.Country] &&
    //     c.Year === d.Year
    // );
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
    .writeFile("2019-data-full.json", JSON.stringify(data, null, 2))
    .catch((e) => console.error(`Something went wrong: ${e}`));
})();
