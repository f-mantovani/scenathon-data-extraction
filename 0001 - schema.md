# Schema

## Data Schema

Below you'll find the data schema for the scenathon frontend moving forward.

Generic Schema:

```typescript
    type Schema = {
    title: string; // We'll be provided later on
    description: string; // We'll be provided later on
    axisY: string; // That will depend on the different graphs
    axisX: string; // Usually year or country
    legend: any[]; // We'll need to add an array of objects, to customize the legend later on
    data: any[];
    maxYAxis?: number; // sometimes the a values is bigger than the y values that we have => ex.: prophorus historical application
    withMarker?: { value: number }; // When the target is the same across the years
    withUnder?: boolean | { value: number; key: string}; // is used when we need to show values under a certain threshold
    upperLower?: boolean; // used when we in situations like food security (average daily intake) or could be used when we need a simple dot in the graph without the line (ex.: Forest Change in 2021)
    byCountry?: boolean; // when we need to show the data by country (ex.: Forest change by country)
    byMultipleCountry?: boolean; // When we need to show data for multiple countries when world is selected  (ex.: Water use for irrigation by country - 2023)
    withHistorical?: boolean; // When we need to show historical data (ex.: Evolution of daily calories intake per capita by country)
    byProduct?: boolean; // for the socioeconomics data
    withTarget?: boolean; // when we have targets to reach => the target value and year to reach should be inside the data array in the correct year
    keys: string[];
    groupMode?: "stacked" | "grouped";
    };
```

Generic data schema:

```typescript
    "data": {
            "valueX": string | number, // This will be always the same key, as this is used to plot the data on the graph on the frontend
            "Total GHG Agriculture": string | number,
            "Livestock CH4": string | number,
            "Livestock N2O": string | number,
            "Crop N2O": string | number,
            "Crop CH4": string | number,
            "Crop CO2": string | number,
            "Biofuel": string | number,
            targets?: [{
                value: number,
                year: number,
            }],
            historical?: string | number,
            lowerBound?: string | number,
            upperBound?: string | number,
      }[]
```

Examplified Schema:

```json
  [
    {
      "title": "Annual GHG emissions from crops and livestock",
      "description": "Annual GHG emissions from crops and livestock.",
      "axisY": "Gt CO2e",
      "axisX": "year",
      "legend": [],
      "data": [
          {
          "valueX": "2000",
          "Total GHG Agriculture": 9.4617192573074,
          "Livestock CH4": 3.253665654256568,
          "Livestock N2O": 3.4037979877694373,
          "Crop N2O": 1.3008491020843524,
          "Crop CH4": 0.5002172327507431,
          "Crop CO2": 1.003189280446301,
          "Biofuel": null
        },
      ],
      "keys": [
        "Total GHG Agriculture",
        "Livestock CH4",
        "Livestock N2O",
        "Crop N2O",
        "Crop CH4",
        "Crop CO2",
        "Biofuel"
      ]
    },
    ...
  ]
````
