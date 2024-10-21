import type { Identifiers } from "./identifier";
import { locationConverter } from "./locationConverter";

export const mapper = (c: any, identifier: Identifiers) => {
  /******************** 2023 ********************/
  if (identifier === "annual_GHG_by_country") {
  }
  if (identifier === "annual_co2_by_country") {
  }
  if (identifier === "water_irrigation_by_country") {
  }
  if (identifier === "crops_vs_livestock") {
  }

  /****************** FOOD (2021 could be placed here too) *****************************/

  if (identifier === "average_calories") {
    const lowerBound = c.MDER_lowerbound;
    const upperBound = c.MDER_upperbound;

    return {
      valueX: c.location ?? c.Country,
      "Kcal Feasability": c.kcal_feas,
      upperBound,
      lowerBound: lowerBound ?? c.kcal_mder,
    };
  }

  if (identifier === "calories_by_country") {
    const lowerBound = c.MDER_lowerbound;
    const upperBound = c.MDER_upperbound;
    const historical = c.kcal_targ;
    return {
      valueX: c.year,
      "Kcal Feasability": c.kcal_feas,
      lowerBound,
      upperBound,
      location: locationConverter[c.location],
      historical,
    };
  }

  if (identifier === "undernourishment") {
    if (typeof c.pou === "string") c.pou = 0.025;
    return {
      valueX: c.location,
      "Prevalence of undernourishment": c.pou * 100,
    };
  }

  if (identifier === "undernourishment_by_country") {
    if (typeof c.pou === "string") c.pou = 0.025;
    return {
      valueX: c.year,
      "Prevalence of undernourishment": c.pou * 100,
      location: c.location,
    };
  }

  /**************** Land **********************/

  if (identifier === "land_inside_protected") {
    const landProtected: Record<string, any> = {
      valueX: c.year,
      "Forest protected areas": c.protectedareasforest / 1000,
      "Other natural protected areas": c.protectedareasothernat / 1000,
      "Other protected areas": c.protectedareasother / 1000,
      "OECM  areas": c.oecmareas / 1000,
      location: c.location,
    };

    if (c.year === 2030 && c.location === "WORLD") {
      landProtected.targets = [
        {
          value: 770.362,
          year: 2030,
        },
      ];
    }
    return landProtected;
  }

  if (identifier === "natural_processes") {
    const naturalProcesses: Record<string, any> = {
      valueX: c.year,
      "Mature forest": c.lnppmatureforest / 1000,
      "Other mature land": c.lnppmatureotherland / 1000,
      "New forest": c.lnppnewforest / 1000,
      "Other new land": c.lnppnewotherland / 1000,
      location: c.location,
    };
    if (c.year === 2050 && c.location === "WORLD") {
      naturalProcesses.targetValue = 6927.884;
      naturalProcesses.targetYear = 2050;
    }
    return naturalProcesses;
  }

  if (identifier === "forest_loss") {
    const forestLoss: Record<string, any> = {
      valueX: c.year,
      "Forest loss": c.calcforest / 1000,
      location: c.location,
    };
    return forestLoss;
  }

  if (identifier === "agro_practices") {
    const agroPractices: Record<string, any> = {
      valueX: c.year,
      agroeco_cropland: c.agroeco_cropland / 1000,
      not_agroeco_cropland: c.not_agroeco_cropland / 1000,
      location: c.location,
    };

    if (c.year === 2050 && c.location === "WORLD") {
      agroPractices.targets = [
        {
          value: 925.578,
          year: 2050,
        },
      ];
    }
    return agroPractices;
  }

  /************ Land 2021 ***************/

  if (identifier === "forest_change") {
    return {
      valueX: c.Year ?? c.year,
      lowerBound: c.NetForestChange,
      "Forest gain": c.Aforestation,
      "Forest loss": c.ForestLoss,
    };
  }

  /**************** Water **********************/

  if (identifier === "water_irrigation") {
    const waterIrrigation: Record<string, any> = {
      valueX: c.year ?? c.Year,
      "Blue water": c.water_requirement / 1000 ?? c.CalcWFblue,
      location: locationConverter[c.location ?? c.Country_1],
    };

    if (c.year === 2050 && c.location === "WORLD") {
      waterIrrigation.targets = [
        {
          value: 2453,
          year: 2050,
        },
      ];
    }
    return waterIrrigation;
  }

  /**************** GHG **********************/

  if (identifier === "annual_co2") {
    const annualCo2: Record<string, any> = {
      valueX: c.year,
      "CO2 from crops": c.calccropco2 / 1000,
      "CO2 equivalent from all sources": c.calcalllandco2e / 1000,
      location: c.location,
    };

    return annualCo2;
  }

  if (identifier === "methane_emissions") {
    const methaneEmissions: Record<string, any> = {
      valueX: c.year,
      "CH4 from livestock": c.calclivech4_ch4,
      "CH4 from crops": c.calccropch4_ch4,
      location: c.location,
    };

    if (c.location === "WORLD") {
      methaneEmissions.targets = [
        {
          value: 93.07,
          year: 2050,
        },
        {
          value: 101.07,
          year: 2030,
        },
      ];
    }

    return methaneEmissions;
  }

  if (identifier === "agro_emissions") {
    const agroEmissions: Record<string, any> = {
      "CH4 from crops": c.calccropch4 / 1000,
      "N2O from crops": c.calccropn2o / 1000,
      "CO2 from crops": c.calccropco2 / 1000,
      "CH4 from livestock": c.calclivech4 / 1000,
      "N2O from livestock": c.calcliven2o / 1000,
    };

    return { location: c.location, ...agroEmissions, valueX: 2050 };
  }

  if (identifier === "cumulative_co2") {
    const cumulativeCo2: Record<string, any> = {
      "CO2 from LUC": c.calcalllandco2e,
      "CO2 from on-farm energy use": c.calccropco2,
    };

    return { location: c.location, ...cumulativeCo2 };
  }

  /**************** Nitro and Phosphorus **********************/

  if (identifier === "nitrogen_application") {
    const nitrogenApplication: Record<string, any> = {
      valueX: c.year,
      "Synthetic nitrogen application": c.calcn_synth / 1000,
      "Organic nitrogen application on agricultural soils":
        c.calcn_agsoils / 1000,
      "Nitrogen application through manure left on pasture":
        c.calcn_leftpasture / 1000,
      location: c.location,
    };
    if (c.year === 2050 && c.location === "WORLD") {
      nitrogenApplication.targets = [
        {
          value: 68,
          year: 2050,
        },
      ];
    }
    return nitrogenApplication;
  }

  if (identifier === "phosphorus_application") {
    const phosphorusApplication: Record<string, any> = {
      valueX: c.year,
      "Total phosphorus": c.totalp,
      historical: c.histp,
      location: c.location,
    };
    if (c.year === 2050 && c.location === "WORLD") {
      phosphorusApplication.targets = [
        {
          value: 16000,
          year: 2050,
        },
      ];
    }
    return phosphorusApplication;
  }
};
