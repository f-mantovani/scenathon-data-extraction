import { promises as fsp } from "fs";

const foods: Record<string, string> = {
  beef: "Beef",
  eggs: "Eggs",
  fruits: "Fruits",
  lamb: "Lamb",
  legumes: "Legumes",
  maize: "Maize",
  milk: "Milk",
  nuts_seeds: "Nuts and seeds",
  oil_palm: "Palm oil",
  oil_veg: "Vegetable oil",
  othr_grains: "Other grains",
  pork: "Pork",
  poultry: "Poultry",
  rice: "Rice",
  roots: "Roots",
  soybeans: "Soybeans",
  sugar: "Sugar",
  vegetables: "Vegetables",
  wheat: "Wheat",
};

export const generateEatFoodGroups = (productsData: any[]) => {
  const obj: { location: string; years: Record<string, any> }[] = [
    {
      location: "ARG",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "AUS",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "BRA",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "CAN",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "CHN",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "COL",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "DEU",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "DNK",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "ETH",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "FIN",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "GRC",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "IND",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "IDN",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "MEX",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "NPL",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "NOR",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "RUS",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "RWA",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "SWE",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "TUR",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "GBR",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "USA",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "R_ASP",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "R_CSA",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "R_NMC",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "R_NEU",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "R_OEU",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "R_SSA",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
    {
      location: "WORLD",
      years: {
        2000: {},
        2005: {},
        2010: {},
        2015: {},
        2020: {},
        2025: {},
        2030: {},
        2035: {},
        2040: {},
        2045: {},
        2050: {},
      },
    },
  ];

  let tester;

  obj.forEach((region: any) => {
    const years = Object.keys(region.years);
    years.forEach((year) => {
      // const filteredData = productsData.filter(d => d.location === region.location && d.year == year);
      const filteredData = productsData.filter(
        (d) => d.location === region.location && d.year == year
      );

      tester = filteredData;
      const foodObj: Record<string, any> = {
        location: region.location,
        valueX: year,
      };

      filteredData.forEach((d: any) => {
        if (d.workersfte) {
          if (
            foods[d.EAT_foodgroup] !== undefined &&
            !foodObj[foods[d.EAT_foodgroup]!]
          ) {
            foodObj[foods[d.EAT_foodgroup]!] = d.employment_eatfood;
          }
        }
      });

      const yearFound = obj.find((d: any) => d.location === region.location);

      if (yearFound) {
        yearFound.years[year] = foodObj;
      }
    });
  });

  // fsp
  //   .writeFile(
  //     "./src/data/tester/eat-food-groups.json",
  //     JSON.stringify(tester, null, 2)
  //   ).then(() => console.log("done"))
  //   .catch((e) => console.error(`Something went wrong: ${e}`));

  const data = [] as any[];

  obj.forEach((region: any) => {
    const years = Object.keys(region.years);
    years.forEach((year) => {
      data.push(region.years[year]);
    });
  });

  return data;
};
