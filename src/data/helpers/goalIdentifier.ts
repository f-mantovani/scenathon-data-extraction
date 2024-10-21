import type { Identifiers } from "./identifier";

export const goalIdentifier: Record<
  "2023" | "2021" | "2020" | "2019",
  Record<string, Identifiers[]>
> = {
  "2019": {
    food_security: ["average_calories_2019"],
    land: ["biodiversity_2019", "forest_change"],
    ghg: ["ghg_2021", "ghg_2019_average"],
    socioeconomics: [],
  },
  "2020": {
    food_security: ["average_calories", "calories_by_country"],
    land: [
      "land_cover",
      "protected_areas",
      "biodiversity",
      "forest_change",
      "forest_change_by_country",
    ],
    water: ["water_irrigation_non_2023", "water_irrigation_by_country"],
    ghg: [
      "ghg_2021",
      "ghg_2021_average",
      "ghg_2021_by_country",
      "ghg_2021_average_by_country",
    ],
    socioeconomics: ["import_2020", "export_2020"],
  },
  "2021": {
    food_security: ["average_calories", "calories_by_country"],
    land: [
      "land_cover",
      "protected_areas",
      "biodiversity",
      "forest_change",
      "forest_change_by_country",
    ],
    water: ["water_irrigation_non_2023", "water_irrigation_by_country"],
    ghg: [
      "ghg_2021",
      "ghg_2021_average",
      "ghg_2021_by_country",
      "ghg_2021_average_by_country",
    ],
    socioeconomics: [],
  },
  "2023": {
    food_security: [
      "undernourishment",
      "average_calories",
      "undernourishment_by_country",
      "calories_by_country",
    ],
    land: [
      "land_inside_protected",
      "natural_processes",
      "forest_loss",
      "agro_practices",
    ],
    water: ["water_irrigation", "water_irrigation_by_country"],
    ghg: [
      "annual_co2",
      "annual_co2_by_country",
      "methane_emissions",
      "annual_GHG_by_country",
      "cumulative_co2",
      "agro_emissions",
    ],
    nitro_and_phospho: ["nitrogen_application", "phosphorus_application"],
    socioeconomics: [
      "eat_food_groups",
      "production_cost",
      "crops_vs_livestock",
    ],
  },
} as const;
