export const generateTradeReport = (filter: any[], restriction?: string) => {
  const oneObject: any = {};

  filter.forEach((d) => {
    const importExport = d.Import_quantity - d.Export_quantity;
    if (!importExport) return;

    if (restriction === "import") {
      if (importExport > 0) {
        if (d.Product in oneObject) {
          if (d.year in oneObject[d.Product]!) {
            oneObject[d.Product][d.year].push({
              location: d.location,
              valueX: d.year,
              [d.location]: importExport,
            });
          } else {
            oneObject[d.Product]! = {
              ...oneObject[d.Product],
              [d.year]: [
                {
                  location: d.location,
                  valueX: d.year,
                  [d.location]: importExport,
                },
              ],
            };
          }
        } else {
          oneObject[d.Product] = {
            [d.year]: [
              {
                location: d.location,
                valueX: d.year,
                [d.location]: importExport,
              },
            ],
          };
        }
      }
    } else {
      if (importExport < 0) {
        if (d.Product in oneObject) {
          if (d.year in oneObject[d.Product]!) {
            oneObject[d.Product][d.year].push({
              location: d.location,
              valueX: d.year,
              [d.location]: importExport * -1,
            });
          } else {
            oneObject[d.Product]! = {
              ...oneObject[d.Product],
              [d.year]: [
                {
                  location: d.location,
                  valueX: d.year,
                  [d.location]: importExport * -1,
                },
              ],
            };
          }
        } else {
          oneObject[d.Product] = {
            [d.year]: [
              {
                location: d.location,
                valueX: d.year,
                [d.location]: importExport * -1,
              },
            ],
          };
        }
      }
    }


    //  fecha o forEach()
  });

  //     oneObject = {
  //       wheat: {
  //         2020: [

  //           { location: "BRA", valueX: year, importer: Boolean, delta: quantity },
  //         ],
  //       },
  //     };

  let data = {} as any

  for (const key in oneObject) {
    if (Object.prototype.hasOwnProperty.call(oneObject, key)) {
      const element = oneObject[key];
      data[key] = []
      for (const elKey in element) {
        const insideElement = element[elKey]

        if (key in data) {
          insideElement.forEach(dataPoint => data[key] = [...data[key], dataPoint])
        }
      }
    }
  }

  return data;
};
