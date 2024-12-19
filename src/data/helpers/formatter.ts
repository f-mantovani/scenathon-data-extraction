import { endCountries } from "./endCountries";
import { generateCropsAndLivestock } from "./generateCropsAndLivestock";
import { generateEatFoodGroups } from "./generateEatFoodGroups";
import { generateWorld } from "./generateWorldData";
import { identifiers, type Identifiers } from "./identifier";
import { mapper } from "./mapper";
import { reducerAFOLU } from "./reducer";
import { sortByYear } from "./sortByYear";
import { generateAverageData } from "./generateAverageData";
import { generateTradeReport } from "./generateTradeReport";

export type LegendItem = {
  key: string;
  color: string;
  type?: 'upper' | 'mark' | 'lower' | 'historical' | 'under' | 'target';
  inLegend?: boolean;
  inGraph?: boolean;
  description?: string;
} | { label: 'Figure description'; description: string; }

export type Base = {
  title: string;
  description: string;
  axisY: string;
  axisX: string;
  legend: LegendItem[];
  data: any[];
  maxYAxis?: number;
  withMarker?: any; // { value: number } | undefined;
  withUnder?: boolean;
  upperLower?: boolean;
  byCountry?: boolean;
  byMultipleCountry?: boolean;
  withHistorical?: boolean;
  byProduct?: boolean;
  withTarget?: any;
  keys: string[];
  groupMode?: "stacked" | "grouped";
  notes?: string;
  spTarget?: boolean;
};



export const formatter = (filter: any[], identifier: Identifiers) => {
  const base: Base = {
    title: "",
    description: "",
    axisY: "",
    axisX: "",
    legend: [],
    data: [],
    keys: identifiers[identifier],
  };

  if (identifier === "undernourishment") {
    base.title = "Prevalence of undernourishment in 2030";
    base.description = "Food Security";
    base.axisY = "% of total population undernourished";
    base.axisX = "country";

    base.withMarker = {
      value: 5,
    };
    base.withUnder = true;
    base.data = filter
      .filter((a) => a.year === 2030)
      .map((c) => mapper(c, "undernourishment"))
      .sort((a, b) => {
        // If 'a' is in the endCountries set and 'b' is not, 'a' should come after 'b'
        if (endCountries.has(a!.valueX) && !endCountries.has(b!.valueX)) {
          return 1;
        }
        // If 'b' is in the endCountries set and 'a' is not, 'b' should come after 'a'
        if (!endCountries.has(a!.valueX) && endCountries.has(b!.valueX)) {
          return -1;
        }
        // If both or neither are in the endCountries set, sort alphabetically
        return a!.valueX.localeCompare(b!.valueX);
      });
  }

  if (identifier === "undernourishment_by_country") {
    base.title = "Evolution of prevalence of undernourishment by country";
    base.byCountry = true;
    base.description = "Food Security";
    base.axisY = "% of total population undernourished";
    base.axisX = "year";

    base.withMarker = {
      value: 5,
    };
    base.withUnder = true;
    base.data = filter
      .map((c) => mapper(c, "undernourishment_by_country"))
      .sort((a, b) => a!.valueX - b!.valueX);
  }

  if (identifier === "average_calories") {
    base.title = "Average daily intake per capita in 2030";
    base.description =
      "The average daily intake of calories per capita in 2030, based on the 2020 baseline scenario.";
    base.axisY = "kcal / cap / day";
    base.axisX = "country";

    base.upperLower = true;
    base.data = filter
      .filter((a) => {
        let year = a.year ?? a.Year;
        return year === 2030;
      })
      .map((c) => mapper(c, "average_calories"))
      .sort((a, b) => {
        // If 'a' is in the endCountries set and 'b' is not, 'a' should come after 'b'
        if (endCountries.has(a!.valueX) && !endCountries.has(b!.valueX)) {
          return 1;
        }
        // If 'b' is in the endCountries set and 'a' is not, 'b' should come after 'a'
        if (!endCountries.has(a!.valueX) && endCountries.has(b!.valueX)) {
          return -1;
        }
        // If both or neither are in the endCountries set, sort alphabetically
        return a!.valueX.localeCompare(b!.valueX);
      });
  }

  if (identifier === "average_calories_2019") {
    base.title =
      "Zero Hunger - Energy intake and Minimum Dietary Energy Requirement (MDER) in kilocalories per capita per day.";
    base.description =
      "The average daily intake of calories per capita in 2019, based on the 2019 baseline scenario.";
    base.axisY = "kcal / cap / day";
    base.axisX = "year";

    base.upperLower = true;
    base.data = generateAverageData(filter, "average_calories");
  }

  if (identifier === "calories_by_country") {
    base.title = "Evolution of daily calories intake per capita by country";
    base.byCountry = true;
    base.description =
      "The average daily intake of calories per capita in 2030, based on the 2020 baseline scenario.";
    base.axisY = "kcal / cap / day";
    base.axisX = "year";

    base.upperLower = true;
    base.withHistorical = true;
    base.data = filter
      .map((c) => mapper(c, "calories_by_country"))
      .sort((a, b) => a!.valueX - b!.valueX);
  }

  if (identifier === "land_inside_protected") {
    base.title =
      "Total area land inside protected areas or other effective conservation measures";
    base.description = "Share of protected area in land";
    base.axisY = "Mha Protected Areas and OECM";
    base.axisX = "year";

    base.legend = [];
    base.data = filter
      .map((c) => mapper(c, "land_inside_protected"))
      .sort((a, b) => a!.valueX - b!.valueX);
    base.byCountry = true;
    base.withTarget = true;
  }

  if (identifier === "natural_processes") {
    base.title = "Area of land where natural processes predominate";
    base.description = "";
    base.axisY = "Mha LNPP";
    base.axisX = "year";

    base.legend = [];
    base.data = filter
      .map((c) => mapper(c, "natural_processes"))
      .sort((a, b) => a!.valueX - b!.valueX);
    base.byCountry = true;
    base.withTarget = true;
  }

  if (identifier === "forest_loss") {
    base.title = "Loss of forest";
    base.description = "Share of forest loss";
    base.axisY = "Mha mature forest";
    base.axisX = "year";

    base.legend = [];
    base.data = sortByYear(filter.map((c) => mapper(c, "forest_loss")));
    base.byCountry = true;
  }

  if (identifier === "agro_practices") {
    base.title = "Cropland area under agroecological practices";
    base.description = "Share of area under agro-ecological practices";
    base.axisY = "MHa cropland";
    base.axisX = "year";

    base.legend = [];
    base.data = sortByYear(filter.map((c) => mapper(c, "agro_practices")));
    base.byCountry = true;
    base.withTarget = true;
  }

  if (identifier === "water_irrigation") {
    base.title = "Water use for irrigation";
    base.description = "Share of irrigated area";
    base.axisY = "km3";
    base.axisX = "year";

    base.legend = [];
    base.maxYAxis = 2600;
    base.data = sortByYear(
      filter
        .filter((a) => a.location === "WORLD")
        .map((c) => mapper(c, "water_irrigation"))
    );
    base.withTarget = true;
  }

  if (identifier === "water_irrigation_by_country") {
    const { array, keys } = generateWorld(filter, "water");
    base.title = "Water use for irrigation by country";
    base.description = "Share of irrigated area";
    base.axisY = "million m3";
    base.axisX = "year";

    base.legend = [];
    base.data = sortByYear(array);
    base.byCountry = true;
    base.keys = keys;
    base.byMultipleCountry = true;
  }

  if (identifier === "annual_co2") {
    base.title =
      "Annual CO2 emissions from land use change and on-farm energy use by source";
    base.description =
      "annual CO2 emissions from land use change and on-farm energy use by source";
    base.axisY = "Gt CO2";
    base.axisX = "year";

    base.legend = [];
    base.data = sortByYear(filter.map((c) => mapper(c, "annual_co2")));
    base.byCountry = true;
  }

  if (identifier === "annual_co2_by_country") {
    const { array, keys } = generateWorld(filter, "annual_co2_by_country");

    base.title =
      "Annual CO2 emissions from land use change and on-farm energy use by country";
    base.description =
      "annual CO2 emissions from land use change and on-farm energy use by source";
    base.axisY = "Gt CO2e";
    base.axisX = "year";

    base.legend = [];
    base.data = sortByYear(array);
    base.keys = keys;
    base.byCountry = true;
    base.byMultipleCountry = true;
  }

  if (identifier === "methane_emissions") {
    base.title =
      "Methane emissions from land use change and on-farm energy use by source";
    base.description =
      "methane emissions from land use change and on-farm energy use by source";
    base.axisY = "Mt CH4";
    base.axisX = "year";

    base.legend = [];
    base.data = sortByYear(filter.map((c) => mapper(c, "methane_emissions")));
    base.byCountry = true;
    base.withTarget = true;
  }

  if (identifier === "annual_GHG_by_country") {
    const { array, keys } = generateWorld(filter, "annual_GHG_by_country");
    base.title =
      "Annual GHG emissions from crops and livestock in Gt CO2e by country";
    base.description =
      "annual GHG emissions from crops and livestock in Gt CO2e by country";
    base.axisY = "Gt CO2e";
    base.axisX = "year";

    base.legend = [];
    base.data = sortByYear(array);
    base.keys = keys;
    base.byCountry = true;
    base.byMultipleCountry = true;
  }

  if (identifier === "agro_emissions") {
    base.title = "Agriculture emissions";
    base.axisX = "year";
    base.data = filter
      .filter((y) => y.year === 2050)
      .map((c) => mapper(c, "agro_emissions"));

    base.byCountry = true;
    base.withTarget = true;
  }

  if (identifier === "cumulative_co2") {
    base.title = "Cummulative CO2 emissions";
    base.axisY = "Gt CO2 by 2050 ";
    base.axisX = "year";
    base.data = reducerAFOLU(
      filter
        .filter((y) => y.year >= 2020)
        .map((c) => mapper(c, "cumulative_co2"))
    );

    base.byCountry = true;
    base.withTarget = true;
  }

  if (identifier === "nitrogen_application") {
    base.title = "Nitrogen application";
    base.description = "Share of nitrogen application";
    base.axisY = "1000 tons";
    base.axisX = "year";

    base.legend = [];
    base.data = sortByYear(
      filter.map((c) => mapper(c, "nitrogen_application"))
    );
    base.byCountry = true;
    base.withTarget = true;
  }

  if (identifier === "phosphorus_application") {
    base.title = "Phosphorus application";
    base.description = "Share of phosphorus application";
    base.axisY = "1000 tons";
    base.axisX = "year";

    base.legend = [];
    base.withHistorical = true;
    base.data = sortByYear(
      filter.map((c) => mapper(c, "phosphorus_application"))
    );
    base.byCountry = true;
    base.withTarget = true;
  }

  if (identifier === "crops_vs_livestock") {
    base.title = "Employment in Agriculture: Crops vs Livestock";
    base.description = "Employment in Agriculture: Crops vs Livestock";
    base.axisY = "Million FTE";
    base.axisX = "year";

    base.legend = [];
    base.data = generateCropsAndLivestock(filter, "crops");
    base.byCountry = true;
    base.byProduct = true;
  }

  if (identifier === "eat_food_groups") {
    base.title = "Employment in Agriculture: Eat Food Groups";
    base.description = "Food Groups";
    base.axisY = "Million FTE";
    base.axisX = "year";
    base.legend = [];
    base.data = generateEatFoodGroups(filter);
    base.byCountry = true;
  }

  if (identifier === "production_cost") {
    base.title = "Total costs of production";
    base.description = "Production Cost";
    base.axisY = "1000 USD";
    base.axisX = "year";

    base.legend = [];
    base.data = generateCropsAndLivestock(filter, "cost");
    base.byCountry = true;
    base.byProduct = true;
  }

  /******************** 2021 ************************/

  if (identifier === "land_cover") {
    const { array, keys } = generateWorld(filter, "land_cover");
    base.title = "Land cover";
    base.description = "Land cover";
    base.axisY = "1000ha per year";
    base.axisX = "year";

    base.legend = [];
    base.data = array;
    base.keys = keys;
  }

  if (identifier === "protected_areas") {
    const { array } = generateWorld(filter, "protected_areas");
    base.title = "Protected Areas by Type";
    base.description = "Protected Areas";
    base.axisY = "1000ha";
    base.axisX = "year";

    base.legend = [];
    base.data = array;
  }

  if (identifier === "biodiversity") {
    const { array, keys } = generateWorld(filter, "biodiversity");
    base.title = "Biodiversity";
    base.description = "Biodiversity";
    base.axisY = "Percentage (%)";
    base.axisX = "year";

    base.legend = [];
    base.data = array;
    base.keys = keys;
  }

  if (identifier === "forest_change") {
    base.title = "Forest change";
    base.description = "Forest change";
    base.axisY = "1000ha per 5 years";
    base.axisX = "year";

    base.legend = [];
    base.data = sortByYear(filter.map((c) => mapper(c, "forest_change")));
    base.upperLower = true;
  }

  if (identifier === "forest_change_by_country") {
    const { array, keys } = generateWorld(filter, "forest_change_by_country");
    base.title = "Forest change by country";
    base.description = "Forest change by country";
    base.axisY = "1000ha per 5 years";
    base.axisX = "year";

    base.legend = [];
    base.data = array;
    base.keys = keys;
    base.byCountry = true;
    base.byMultipleCountry = true;
  }

  if (identifier === "water_irrigation_non_2023") {
    const { array } = generateWorld(filter, "water_non_2023");
    base.title = "This is the water used by the world non 2023";
    base.description = "Share of irrigated area";
    base.axisY = "million m3";
    base.axisX = "year";

    base.legend = [];
    base.data = array;
  }

  if (identifier === "ghg_2021") {
    const { array, keys } = generateWorld(filter, "ghg_2021");
    base.title = "Annual GHG emissions from crops and livestock";
    base.description = "Annual GHG emissions from crops and livestock.";
    base.axisY = "Gt CO2e";
    base.axisX = "year";

    base.legend = [];
    base.data = array;
    base.keys = keys;
    // base.groupMode = "grouped";
  }

  if (identifier === "ghg_2021_average") {
    const { array, keys } = generateWorld(filter, "ghg_2021_average");

    base.title =
      "Average annual GHG emissions from land use change and peat oxidation.";
    base.description =
      "Average annual GHG emissions from land use change and peat oxidation";
    base.axisY = "Gt CO2e";
    base.axisX = "year";

    base.legend = [];
    base.data = array;
    base.keys = keys;
    base.withTarget = true;
  }

  if (identifier === "ghg_2021_by_country") {
    const { array, keys } = generateWorld(filter, "ghg_2021_by_country");
    base.title = "GHG emissions from crops and livestock in Gt CO2e by country";
    base.description =
      "GHG emissions from crops and livestock in Gt CO2e by country";
    base.axisY = "Gt CO2e";
    base.axisX = "year";

    base.legend = [];
    base.data = array;
    base.keys = keys;
    base.byCountry = true;
    base.byMultipleCountry = true;
  }

  if (identifier === "ghg_2021_average_by_country") {
    const { array, keys } = generateWorld(
      filter,
      "ghg_2021_average_by_country"
    );

    base.title =
      "Average annual GHG emissions from land use change and peat oxidation in Gt CO2e by country.";
    base.description =
      "Average annual GHG emissions from land use change and peat oxidation in Gt CO2e by country.";
    base.axisY = "Gt CO2e";
    base.axisX = "year";

    base.legend = [];
    base.data = array;
    base.keys = keys;
    base.byCountry = true;
    base.byMultipleCountry = true;
  }

  if (identifier === "ghg_2019_average") {
    const { array, keys } = generateWorld(filter, "ghg_2019_average");
    base.title =
      "Average annual GHG emissions from land use change and peat oxidation in Gt CO2e by country.";
    base.description =
      "Average annual GHG emissions from land use change and peat oxidation in Gt CO2e by country.";
    base.axisY = "Gt CO2e";
    base.axisX = "year";

    base.legend = [];
    base.data = array;
    base.keys = keys;
  }

  if (identifier === "biodiversity_2019") {
    base.title = "Biodiversity";
    base.description = "Biodiversity";
    base.axisY = "% of total land";
    base.axisX = "year";

    base.legend = [];
    base.data = generateAverageData(filter, "biodiversity");
  }

  if (identifier === "import_2020") {
    base.title = "Importation";
    base.description = "Trade report for several products";
    (base.byProduct = true), (base.axisY = "Import quantity (unit 1000 tons)");
    base.data = generateTradeReport(filter, "import");
    base.axisX = "year";
  }

  if (identifier === "export_2020") {
    base.title = "Exportation";
    (base.byProduct = true),
      (base.description = "Trade report for several products");
    base.axisY = "Export quantity (unit 1000 tons)";
    base.data = generateTradeReport(filter, "export");
    base.axisX = "year";
  }

  return base;
};
