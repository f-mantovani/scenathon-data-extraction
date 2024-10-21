import dataFormatted from "../../../data-formatted.json";
const target = dataFormatted.find(
  (a) => a.title == "Cummulative CO2 emissions"
);

export const reducerAFOLU = (target: any) => {
  return target.reduce((acc, cV) => {
    const existing = acc.find((a) => a.location === cV.location);
    if (existing) {
      existing["CO2 from LUC"] += cV["CO2 from LUC"] / 1000;
      existing["CO2 from on-farm energy use"] +=
        cV["CO2 from on-farm energy use"] / 1000;
      return acc;
    } else {
      const newObj: Record<string, any> = {
        location: cV.location,
        "CO2 from LUC": cV["CO2 from LUC"] / 1000,
        "CO2 from on-farm energy use": cV["CO2 from on-farm energy use"] / 1000,
        valueX: 2050,
      };
      if (cV.location === "WORLD") {
        newObj.targets = [
          {
            value: 40,
            year: 2050,
          },
        ];
      }
      return [...acc, newObj];
    }
  }, []);
};
