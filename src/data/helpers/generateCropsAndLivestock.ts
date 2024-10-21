import { promises as fsp } from "fs";

export const generateCropsAndLivestock = (
  productsData: any[],
  restriction: "crops" | "cost"
) => {
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

  obj.forEach((region: any) => {
    const years = Object.keys(region.years);
    years.forEach((year) => {
      const filteredData = productsData.filter(
        (d) => d.location === region.location && d.year == year
      );

      if (restriction === "crops") {
        const foodObj: Record<string, any> = {
          location: region.location,
          valueX: parseInt(year),
        };
        const livestock = filteredData.find(
          (d) => d.workersfte_total_livestock
        );
        const crops = filteredData.find((d) => d.workersfte_total_crop);
        (foodObj["Livestock: Number of Full Time Equivalent workers"] =
          livestock?.workersfte_total_livestock),
          (foodObj["Crop: Number of Full Time Equivalent workers"] = crops?.workersfte_total_crop),
          filteredData.forEach((d: any) => {
            if (d.workersfte) {
              foodObj[d.product] = d.workersfte;
            }
          });

        const foundPlace = obj.find((d: any) => d.location === region.location);

        if (foundPlace) foundPlace.years[year] = foodObj;
      }

      if (restriction === "cost") {
        const founder = obj.find((d: any) => d.location === region.location);

        filteredData.forEach((d: any) => {
          if (founder) {
            if ("all" in founder.years[year]) {
              founder.years[year].location = founder.location;
              founder.years[year].valueX = parseInt(year);
              founder.years[year].all["Fertilizers cost"] += d.fertilizercost;
              founder.years[year].all["Labour cost"] += d.labourcost;
              founder.years[year].all["Machinery running cost"] +=
                d.machineryrunningcost;
              founder.years[year].all["Diesel cost"] += d.dieselcost;
              founder.years[year].all["Pesticide cost"] += d.pesticidecost;
            } else {
              founder.years[year].location = founder.location;
              founder.years[year].valueX = parseInt(year);
              founder.years[year].all = {
                "Fertilizers cost": d.fertilizercost,
                "Labour cost": d.labourcost,
                "Machinery running cost": d.machineryrunningcost,
                "Diesel cost": d.dieselcost,
                "Pesticide cost": d.pesticidecost,
              };
            }

            founder.years[year] = {
              ...founder.years[year],
              [d.product]: {
                "Fertilizers cost": d.fertilizercost,
                "Labour cost": d.labourcost,
                "Machinery running cost": d.machineryrunningcost,
                "Diesel cost": d.dieselcost,
                "Pesticide cost": d.pesticidecost,
              },
            };
          }
        });
      }
    });
  });

  // fsp
  //   .writeFile(
  //     "./src/data/tester/total-cost.json",
  //     JSON.stringify(obj, null, 2)
  //   )
  //   .then(() => console.log("done"))
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
