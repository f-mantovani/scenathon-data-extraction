import { fs, glob, pathToFileURL, type Base } from "./writeHelper";

class Colors {
  fresh_water = "#4d908e";
  target = "#E3180B";
}

const colors = new Colors();

(async function () {
  const allPath = await glob("./src/data/store/*-water-*.json");

  for await (const path of allPath) {
    const { pathname } = pathToFileURL(path);
    const file = (await import(pathname)).default;

    const final = pathname.split("/").at(-1);
    const year = Number(final?.split("-")[0]);
    

    file.forEach((el: Base, i: number) => {
      if (year === 2020 || year === 2021) {
        if (i === 0) {
          el.title = "Water use for agriculture";
          el.description =
            "Fresh water used for irrigation of crops and livestock production";
          el.axisY = "Fresh water use (km\u00B3)";
          el.keys = ["Water use"];
          el.legend = [
            {
              key: "Water use",
              color: colors.fresh_water,
              inGraph: true,
              inLegend: true,
            },
          ];
          el.data = el.data.map(e => ({
            valueX: e.valueX,
            'Water use': e['Blue water']
          }))
        }

        if (i === 1) {
          el.title = "Water use for agriculture by country";
          el.description =
            "Fresh water used for irrigation of crops and livestock production";
          el.axisY = "Fresh water use (km\u00B3)";
        }
      }

      if (year === 2023) {
        if (i === 0) {
            el.title = 'Water use for irrigation'
            el.description = 'Total amount of water for irrigation of crops'
            el.keys = ['Water use']
            el.axisY = 'Irrigation water (km\u00B3)'
            el.legend = [
                {
                    key: 'Water use',
                    color: colors.fresh_water,
                    inGraph: true,
                    inLegend: true,
                },
                {
                    key: 'FABLE target',
                    color: colors.target,
                    inLegend: true,
                    type: 'target'
                }
            ]
            el.data = el.data.map(e => ({
                valueX: e.valueX,
                location: e.location,
                'Water use': e['Blue water'],
                targets: e.targets
            }))
            el.spTarget = true
        }

        if (i === 1) {
            el.title = 'Water use for irrigation by country'
            el.description = 'Total amount of water for irrigation of crops'
            el.axisY = 'Irrigation water (km\u00B3)'
        }

      }
    });

    await fs.writeFile(
      `./src/data/tester/${final}`,
      JSON.stringify(file, null, 2)
    );
  }
})();
