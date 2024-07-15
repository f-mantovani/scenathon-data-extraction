import { identifiers, type Identifiers } from "./identifier";
import { mapper } from "./mapper";

type Base = {
  title: string;
  description: string;
  axisY: string;
  axisX: string;
  graphType: string;
  legend: any[];
  data: any[];
  withMarker?: any; // { value: number } | undefined;
  withUnder?: boolean;
  upperLower?: boolean;
  byCountry?: boolean;
  keys: any[];
} 


export const formatter = (
  filter: any[],
  identifier: Identifiers,
  region: string = "arg"
) => {
  const base: Base = {
    title: "",
    description: "",
    axisY: "",
    axisX: "",
    graphType: "",
    legend: [] ,
    data: [],
    keys: identifiers[identifier],
  };

  if (identifier === "undernourishment") {
    base.title = "Prevalence of undernourishment in 2030";
    base.description = "Food Security";
    base.axisY = "% of total population undernourished";
    base.axisX = "country";
    base.graphType = "bar";
    base.withMarker = {
      value: 5,
    };
    base.withUnder = true;
    base.data = filter
      .filter((a) => a.year === 2030)
      .map((c) => mapper(c, "undernourishment"));
  }

  if (identifier === "undernourishment_by_country") {
    base.title = "Prevalence of undernourishment in 2030";
    base.byCountry = true;
    base.description = "Food Security";
    base.axisY = "% of total population undernourished";
    base.axisX = "country";
    base.graphType = "bar";
    base.withMarker = {
      value: 5,
    };
    base.withUnder = true;
    base.data = filter
      .filter((a) => a.location.toLowerCase() === region.toLowerCase())
      .map((c) => mapper(c, "undernourishment_by_country"))
      .sort((a, b) => a.valueX - b.valueX);
  }

  if (identifier === "average_calories") {
    base.title = "Average daily intake per capita in 2030";
    base.description =
      "The average daily intake of water per capita in 2030, based on the 2020 baseline scenario.";
    base.axisY = "kcal / cap / day";
    base.axisX = "country";
    base.graphType = "bar";
    base.upperLower = true;
    base.data = filter
      .filter((a) => a.year === 2030)
      .map((c) => mapper(c, "average_calories"));
  }

  if (identifier === "calories_by_country") {
    base.title = "Average daily intake per capita in 2030";
    base.byCountry = true;
    base.description =
      "The average daily intake of water per capita in 2030, based on the 2020 baseline scenario.";
    base.axisY = "kcal / cap / day";
    base.axisX = "country";
    base.graphType = "bar";
    base.upperLower = true;
    base.data = filter
      .filter((a) => a.location.toLowerCase() === region.toLowerCase())
      .map((c) => mapper(c, "calories_by_country"))
      .sort((a, b) => a.valueX - b.valueX);
  }

  if (identifier === "land_inside_protected") {
    base.title =
      "Total area land inside protected areas or other effective conservation measures";
    base.description = "Share of protected area in land";
    base.axisY = "Mha Protected Areas and OECM";
    base.axisX = "year";
    base.graphType = "bar";
    base.legend = [
      {
        id: 1,
        label: "Forests in PA areas",
        color: "red",
      },
      {
        id: 2,
        label: "Other natural lands in PA areas",
        color: "blue",
      },
      {
        id: 3,
        label: "Other lands (cropland, pastures) in PA areas",
        color: "darkgreen",
      },
      {
        id: 4,
        label:
          "Other Effective Conservations Measures (all land cover classes)",
        color: "lightgreen",
      },
    ];
  }

  return base;
};
