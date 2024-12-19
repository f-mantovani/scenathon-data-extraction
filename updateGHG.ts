import { fs, glob, pathToFileURL, type Base } from "./writeHelper";

class Color {
  fao = "black";
  ghg_total = "hsl(300, 70%, 50%)";
  livestock_ch4 = "#9b2226";
  livestock_n2o = "hsl(35, 70%, 40%)";
  crop_n2o = "#4d908e";
  crop_ch4 = "hsl(120, 70%, 25%)";
  crop_co2 = "hsl(60, 70%, 50%)";
}

const colors = new Color();

(async function () {
  const allPaths = await glob("./src/data/store/*-ghg-*.json");

  for await (const path of allPaths) {
    const { pathname } = pathToFileURL(path);
    const file = (await import(pathname)).default;

    const final = pathname.split("/").at(-1);
    const year = Number(final?.split("-").at(0));

    file.forEach((el: Base, i: number) => {
      if (year === 2019) {
        if (i === 0) {
          el.legend = [
            {
              key: "FAO agriculture global",
              color: colors.fao,
              type: "lower",
              inLegend: true,
            },
            {
              key: "Total GHG agriculture",
              color: colors.ghg_total,
              type: "upper",
              inLegend: true,
            },
            {
              key: "Livestock CH4",
              color: colors.livestock_ch4,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Livestock N2O",
              color: colors.livestock_n2o,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Crop N2O",
              color: colors.crop_n2o,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Crop CO2",
              color: colors.crop_co2,
              inGraph: true,
              inLegend: true,
            },
          ];
          el.data.forEach((e) => {
            e["FAO agriculture global"] = e["FAO Agric global"];
            delete e["FAO Agric global"];

            e["Total GHG agriculture"] = e["Total GHG Agriculture"];
            delete e["Total GHG Agriculture"];
          });
          el.upperLower = true;
          el.keys = el.legend.filter((e) => e.inGraph).map((e) => e.key);
        }

        if (i === 1) {
          el.legend = [
            {
              key: "FAO LU global",
              color: colors.fao,
              type: "lower",
              inLegend: true,
            },
            {
              key: "Total GHG land",
              color: colors.ghg_total,
              type: "upper",
              inLegend: true,
            },
            {
              key: "Forest loss",
              color: colors.crop_ch4,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Other LUC",
              color: colors.crop_co2,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Sequestration",
              color: colors.crop_n2o,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Peat",
              color: colors.livestock_ch4,
              inGraph: true,
              inLegend: true,
            },
          ];
          el.keys = el.legend.filter((e) => e.inGraph).map((e) => e.key);
          el.upperLower = true;
          el.data.forEach((e) => {
            e["Total GHG land"] = e["Total GHG Land"];
            delete e["Total GHG Land"];
          });
        }
      }

      if (year === 2020 || year === 2021) {
        if (i === 0) {
          el.legend = [
            {
              key: "Total GHG Agriculture",
              inLegend: true,
              type: "upper",
              color: colors.ghg_total,
            },
            {
              key: "FAO Agric global",
              type: "lower",
              inLegend: true,
              color: colors.fao,
            },
            {
              key: "Livestock CH4",
              color: colors.livestock_ch4,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Livestock N2O",
              color: colors.livestock_n2o,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Crop N2O",
              color: colors.crop_n2o,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Crop CO2",
              color: colors.crop_co2,
              inGraph: true,
              inLegend: true,
            },
          ];
          el.upperLower = true;
          el.keys = el.legend.filter((e) => e.inGraph).map((e) => e.key);
        }

        if (i === 1) {
            console.log(el.data[1])
          el.legend = [
            {
              key: "FAO LU global",
              color: colors.fao,
              type: "lower",
              inLegend: true,
            },
            {
              key: "Total GHG Land",
              color: colors.ghg_total,
              type: "upper",
              inLegend: true,
            },
            {
              key: "Forest loss",
              color: colors.crop_ch4,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Other LUC",
              color: colors.crop_co2,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Sequestration",
              color: colors.crop_n2o,
              inGraph: true,
              inLegend: true,
            },
            {
              key: "Peat",
              color: colors.livestock_ch4,
              inGraph: true,
              inLegend: true,
            },
          ];
          el.keys = el.legend.filter((e) => e.inGraph).map((e) => e.key);
          el.upperLower = true;
        }
      }

      if (year === 2023) {
        if (i === 4) {
            el.spTarget = true
        }
      }




    });

    await fs.writeFile(
      `./src/data/tester/${final}`,
      JSON.stringify(file, null, 2),
    );
  }
})();
