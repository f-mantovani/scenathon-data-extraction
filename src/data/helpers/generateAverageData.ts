export const generateAverageData = (
  data: any[],
  restriction: "average_calories" | "biodiversity"
) => {
  const averageArray: Record<string, any>[] = [];
  const yearsSize: Record<string, number> = {};

  if (restriction === "average_calories") {
    data.forEach((d) => {
      const found = averageArray.find((a) => a.valueX === d.year);
      if (!found) {
        averageArray.push({
          valueX: d.year,
          avg_intake: d.kcal_feas,
          lowerBound: d.kcal_mder,
          upperBound: d.kcal_targ,
        });
      } else {
        found.avg_intake += d.kcal_feas;
        found.lowerBound += d.kcal_mder;
        found.upperBound += d.kcal_targ;
      }
      yearsSize[d.year] = yearsSize[d.year] ? yearsSize[d.year]! + 1 : 1;
    });

    averageArray.forEach((a) => {
      a.avg_intake = a.avg_intake / yearsSize[a.valueX];
      a.lowerBound = a.lowerBound / yearsSize[a.valueX];
      a.upperBound = a.upperBound / yearsSize[a.valueX];
    });
  }

  if (restriction === "biodiversity") {
    data.forEach((d) => {
      const found = averageArray.find((a) => a.valueX === d.year);
      if (!found) {
        averageArray.push({
          valueX: d.year,
          biodiversity: d.biodivshareland,
        });
      } else {
        found.biodiversity += d.biodivshareland;
      }
      yearsSize[d.year] = yearsSize[d.year] ? yearsSize[d.year]! + 1 : 1;
    });

    averageArray.forEach((a) => {
      a.biodiversity = (a.biodiversity / yearsSize[a.valueX]) * 100;
    });
  }

  return averageArray;
};
