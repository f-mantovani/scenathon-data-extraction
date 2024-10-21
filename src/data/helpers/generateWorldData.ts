export const generateWorld = (
  data: any[],
  restriction:
    | "water"
    | "annual_co2_by_country"
    | "annual_GHG_by_country"
    | "crops_vs_livestock"
    | "land_cover"
    | "protected_areas"
    | "biodiversity"
    | "forest_change_by_country"
    | "ghg_2021"
    | "ghg_2021_average"
    | "ghg_2021_by_country"
    | "ghg_2021_average_by_country"
    | "ghg_2019_average"
    | "water_non_2023"
) => {
  const obj: Record<string, any> = {};

  // Transformed data on the 2021 version to conform to that one
  if (restriction === "water") {
    data.forEach((d) => {
      if (d.location === "WORLD") return;
      if (d.year in obj) {
        obj[d.year][d.location] = d.water_requirement / 1000;
      } else {
        obj[d.year] = {
          [d.location]: d.water_requirement / 1000,
        };
      }
    });
  }

  if (restriction === "annual_co2_by_country") {
    data.forEach((d) => {
      if (d.location === "WORLD") return;
      if (d.year in obj) {
        obj[d.year][d.location] =
          d.calccropco2 / 1000 + d.calcalllandco2e / 1000;
      } else {
        obj[d.year] = {
          [d.location]: d.calccropco2 / 1000 + d.calcalllandco2e / 1000,
        };
      }
    });
  }

  if (restriction === "annual_GHG_by_country") {
    data.forEach((d) => {
      if (d.location === "WORLD") return;
      if (d.year in obj) {
        obj[d.year][d.location] = d.calcallagrico2e;
      } else {
        obj[d.year] = {
          [d.location]: d.calcallagrico2e,
        };
      }
    });
  }

  if (restriction === "crops_vs_livestock") {
    data.forEach((d) => {
      if (d.location === "WORLD") return;
      if (d.year in obj) {
        obj[d.year][d.location] = {
          "Crop: Number of Full Time Equivalent workers":
            d.workersfte_total_crop,
          "Livestock: Number of Full Time Equivalent workers":
            d.workersfte_total_livestock,
        };
      } else {
        obj[d.year] = {
          "Crop: Number of Full Time Equivalent workers":
            d.workersfte_total_crop,
          "Livestock: Number of Full Time Equivalent workers":
            d.workersfte_total_livestock,
        };
      }
    });
  }

  /****************** 2021 *********************/

  if (restriction === "protected_areas") {
    data.forEach((d) => {
      if (!obj[d.year]) {
        obj[d.year] = {
          "Protected Areas Forest": d.ProtectedAreasForest ?? 0,
          "Protected Areas Other Natural": d.ProtectedAreasOtherNat ?? 0,
          "Protected Areas Other": d.ProtectedAreasOther ?? 0,
        };
      } else {
        obj[d.year] = {
          ...obj[d.year],
          "Protected Areas Forest":
            obj[d.year]["Protected Areas Forest"] +
            (d.ProtectedAreasForest ?? 0),
          "Protected Areas Other Natural":
            obj[d.year]["Protected Areas Other Natural"] +
            (d.ProtectedAreasOtherNat ?? 0),
          "Protected Areas Other":
            obj[d.year]["Protected Areas Other"] + (d.ProtectedAreasOther ?? 0),
        };
      }
    });
  }

  if (restriction === "land_cover") {
    data.forEach((d) => {
      if (!obj[d.year]) {
        obj[d.year] = {
          Pasture: d.CalcPasture,
          Cropland: d.CalcCropland,
          Forest: d.CalcForest,
          "Other Land": d.CalcOtherLand,
          Urban: d.CalcUrban,
          "New Forest": d.CalcNewForest,
        };
      } else {
        obj[d.year] = {
          ...obj[d.year],
          Pasture: obj[d.year]["Pasture"] + d.CalcPasture,
          Cropland: obj[d.year]["Cropland"] + d.CalcCropland,
          Forest: obj[d.year]["Forest"] + d.CalcForest,
          "Other Land": obj[d.year]["Other Land"] + d.CalcOtherLand,
          Urban: obj[d.year]["Urban"] + d.CalcUrban,
          "New Forest": obj[d.year]["New Forest"] + d.CalcNewForest,
        };
      }
    });
  }

  if (restriction === "biodiversity") {
    data.forEach((d) => {
      if (d.location === "WORLD") return;
      if (d.year in obj) {
        obj[d.year][d.location] = d.biodiversity_land;
      } else {
        obj[d.year] = {
          [d.location]: d.biodiversity_land,
        };
      }
    });
  }

  if (restriction === "forest_change_by_country") {
    data.forEach((d) => {
      if (d.year in obj) {
        obj[d.year][d.location] = d.NetForestChange;
      } else {
        obj[d.year] = {
          [d.location]: d.NetForestChange,
        };
      }
    });
  }

  if (restriction === "water_non_2023") {
    data.forEach((d) => {
      if (d.year in obj) {
        obj[d.year] += d.CalcWFblue;
      } else {
        obj[d.year] = d.CalcWFblue;
      }
    });
  }

  if (restriction === "ghg_2021") {
    data.forEach((d) => {
      if (d.year in obj) {
        obj[d.year] = {
          "Total GHG Agriculture":
            obj[d.year]["Total GHG Agriculture"] +
            (d.CalcLiveAllCO2e + d.CalcCropAllCO2e) / 1000,
          "Livestock CH4": obj[d.year]["Livestock CH4"] + d.CalcLiveCH4 / 1000,
          "Livestock N2O": obj[d.year]["Livestock N2O"] + d.CalcLiveN2O / 1000,
          "Crop N2O": obj[d.year]["Crop N2O"] + d.CalcCropN2O / 1000,
          "Crop CH4": obj[d.year]["Crop CH4"] + d.CalcCropCH4 / 1000,
          "Crop CO2": obj[d.year]["Crop CO2"] + d.CalcCropCO2 / 1000,
          Biofuel: obj[d.year]["Biofuel"] + d.GHGbiofuels / 1000,
        };
        if (d.year === 2050) {
          obj[d.year] = {
            ...obj[d.year],
            targets: [
              {
                value: 4,
                year: 2050,
              },
            ],
          };
        }
      } else {
        obj[d.year] = {
          "Total GHG Agriculture":
            (d.CalcLiveAllCO2e + d.CalcCropAllCO2e) / 1000,
          "Livestock CH4": d.CalcLiveCH4 / 1000,
          "Livestock N2O": d.CalcLiveN2O / 1000,
          "Crop N2O": d.CalcCropN2O / 1000,
          "Crop CH4": d.CalcCropCH4 / 1000,
          "Crop CO2": d.CalcCropCO2 / 1000,
          Biofuel: d.GHGbiofuels / 1000,
        };
      }
    });
  }

  if (restriction === "ghg_2021_average") {
    const dataMapper = data.map(({ location }) => location);
    const uniqueData = new Set(dataMapper);
    data.forEach((d) => {
      if (d.year in obj) {
        obj[d.year] = {
          "Total GHG Land":
            obj[d.year]["Total GHG Land"] +
            d.CalcAllLandCO2e / 100 / uniqueData.size,
          "Forest Loss":
            obj[d.year]["Forest Loss"] + d.CalcDeforCO2 / 100 / uniqueData.size,
          "Other LUC":
            obj[d.year]["Other LUC"] +
            d.CalcOtherLUCCO2 / 100 / uniqueData.size,
          Sequestration:
            obj[d.year]["Sequestration"] +
            d.CalcSequestCO2 / 100 / uniqueData.size,
          Peat:
            obj[d.year]["Peat"] + (d.CalcPeatCO2 ?? 0) / 100 / uniqueData.size,
        };
        if (d.year === 2050) {
          obj[d.year] = {
            ...obj[d.year],
            targets: [
              {
                value: 0,
                year: 2050,
              },
            ],
          };
        }
      } else {
        obj[d.year] = {
          "Total GHG Land": d.CalcAllLandCO2e / 100 / uniqueData.size,
          "Forest Loss": d.CalcDeforCO2 / 1000 / uniqueData.size,
          "Other LUC": d.CalcOtherLUCCO2 / 1000 / uniqueData.size,
          Sequestration: d.CalcSequestCO2 / 100 / uniqueData.size,
          Peat: (d.CalcPeatCO2 ?? 0) / 100 / uniqueData.size,
        };
      }
    });
  }

  if (restriction === "ghg_2021_by_country") {
    data.forEach((d) => {
      if (d.year in obj) {
        obj[d.year][d.location] = d.CalcAllAgriCO2e / 1000;
      } else {
        obj[d.year] = {
          [d.location]: d.CalcAllAgriCO2e / 1000,
        };
      }
    });
  }

  if (restriction === "ghg_2021_average_by_country") {
    data.forEach((d) => {
      if (d.year in obj) {
        obj[d.year][d.location] = d.CalcAllLandCO2e / 1000;
      } else {
        obj[d.year] = {
          [d.location]: d.CalcAllLandCO2e / 1000,
        };
      }
    });
  }

  if (restriction === "ghg_2019_average") {
    data.forEach((d) => {
      if (d.year in obj) {
        obj[d.year] = {
          "Total GHG Land":
            obj[d.year]["Total GHG Land"] + d.total_LUC_CO2 / 1000,
          "Forest Loss": obj[d.year]["Forest Loss"] + d.defor_CO2 / 1000,
          "Other LUC": obj[d.year]["Other LUC"] + d.otherluc_CO2 / 1000,
          Sequestration: obj[d.year]["Sequestration"] + d.sequest_CO2 / 1000,
          Peat: obj[d.year]["Peat"] + d.peat_CO2 / 1000,
        };
        // if (d.year === 2050) {
        //   obj[d.year] = {
        //     ...obj[d.year],
        //     targets: [
        //       {
        //         value: 4,
        //         year: 2050,
        //       },
        //     ],
        //   };
        // }
      } else {
        obj[d.year] = {
          "Total GHG Land": d.total_LUC_CO2 / 1000,
          "Forest Loss": d.defor_CO2 / 1000,
          "Other LUC": d.otherluc_CO2 / 1000,
          Sequestration: d.sequest_CO2 / 1000,
          Peat: d.peat_CO2 / 1000,
        };
      }
    });
  }
  const array = [];
  let keys: any;

  if (restriction !== "water_non_2023") {
    for (const [year, value] of Object.entries(obj)) {
      const newValue = { valueX: year, ...value };
      array.push(newValue);
    }

    keys = Object.keys(obj[2000]);
    return { array, keys };
  }

  for (const [year, value] of Object.entries(obj)) {
    const newValue = { valueX: year, "Blue water": value / 1000 };
    array.push(newValue);
  }


  return { array, keys };
};
