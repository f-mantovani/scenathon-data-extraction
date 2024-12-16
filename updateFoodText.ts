import type { Base } from "./src/data/helpers/formatter.js";
import { glob, fs, pathToFileURL } from "./writeHelper";
import data2021 from "./2021-data-full.json";
import data2020 from "./2020-data-full.json";

const colors = {
  computed: "hsl(240, 70%, 50%)",
  historical: "#f9e14b",
  upper: "#6de8b8",
  lower: "#ce9300",
  under: "#bfdcf8",
  marker: "red",
};

(async function () {
  const allFilePaths = await glob(
    "./src/data/store/*-food_security-*.json",
  );

  for await (const filePath of allFilePaths) {
    const fileURL = pathToFileURL(filePath);
    const file = (await import(fileURL.pathname)).default;

    const final = fileURL.pathname.split("/").at(-1);
    const path = Number(final?.split("-")[0]);
    const pathway = fileURL.pathname.split("-")[3];
    const trade = fileURL.pathname.split("-")[4]?.replace(/.json/, "");

    file.forEach((el: Base, i: number) => {
      if (path == 2023) {
        // Rows 17, 18, 19 and 20
        if (i == 0) {
          el.title = `Prevalence of undernourishment in 2030`;
          el.description = `The prevalence of unernourishment in 2030 based on each countries' 2020 population and inequalities characteristics`;
          el.data.forEach((e) => {
            e.Computed = e["Prevalence of undernourishment"];
            delete e["Prevalence of undernourishment"];
          });
          el.keys = ["Computed"];
          el.legend = [
            {
              label: "Figure description",
              description: `The Prevalence of Undernourishment (PoU) is based on the distribution of habitual dietary energy consumption of hypothetical average individuals. The PoU calculates the probability that the habitual dietary energy consumption of individuals is
              below the lower limit of acceptable energy requirements to be in good health and have socially desirable physical activity. The methodology followed is explained in further detail in Annex 1B of the FAO’s The State of Food Security and Nutrition in the World.`,
            },
            {
              key: "Computed",
              color: colors.computed,
              inLegend: true,
              inGraph: true,
            },
            {
              key: "< 2.5",
              color: colors.under,
              type: "under",
              inLegend: true,
              description:
                "FAO considers national level PoU estimates lower than 2.5 percent as being insufficiently reliable to be reported",
            },
            {
              key: "FABLE Target",
              color: colors.marker,
              type: "mark",
              inLegend: true,
              description: "Below 5% of the population",
            },
          ];
          el.notes = `The prevalence of undernourishment assumes a lognormal distribution, defined by mean dietary energy consumption (DEC), CV (taken from the FAO and kept constant at 2020 levels), and MDER per capita`;
          el.axisY = "Prevalence of undernourishment (%)";
        }
        // Rows 10, 11 and 12
        if (i == 1) {
          el.title = `Average daily intake per capita in 2030`;
          el.description = `The average daily intake of calories per capita in 2030, based on the 2020 baseline scenario`;
          el.legend = [
            {
              inLegend: false,
              label: `Figure description`,
              description: `<p>This figure compares the average per capita kilocalorie intake across listed countries and regions with their respective Minimum Dietary Energy Requirement (MDER) in 2030.</p>
                            <br />
                            <p>The average per capita kilocalorie intake reflects actual food consumption when food waste is taken into account. Based on the FAO's definition of the population at risk of hunger (Cafiero, 2014) and in line with Sustainable Development Goal (SDG) 2, which aims to achieve universal food and nutrition security by 2030, FABLE's food security objective sets a target range of 10% to 50% above the MDER in all countries by 2030. The MDER represents the minimum caloric intake required for good health, varying by age, sex, and activity level.</p>
                            <br />
                            <p>While this target does not address food access inequalities within countries, it provides a clear and measurable benchmark for assessing progress toward global food security.</p>`,
            },
            {
              key: "Computed",
              color: colors.computed,
              inLegend: true,
              inGraph: true,
            },
            {
              key: `Upper bound target`,
              color: colors.upper,
              type: `upper`,
              description: `50% above the MDER`,
              inLegend: true,
            },
            {
              key: `Lower bound target`,
              color: colors.lower,
              type: `lower`,
              description: `10% above the MDER`,
              inLegend: true,
            },
          ];
          el.keys = ["Computed"];
          el.data.forEach((e) => {
            e.Computed = e["Kcal Feasability"];
            e["Upper bound target"] = e.upperBound;
            e["Lower bound target"] = e.lowerBound;
            delete e["Kcal Feasability"];
            delete e.upperBound;
            delete e.lowerBound;
          });
        }
        // Rows 21, 22, 23 and 24
        if (i == 2) {
          el.title = `Prevalence of undernourishment by country`;
          el.description = `The evolution of prevalence of unernourishment by country based on the country's 2020 population and inequalities characteristics`;
          el.data.forEach((e) => {
            e.Computed = e["Prevalence of undernourishment"];
            delete e["Prevalence of undernourishment"];
          });
          el.keys = ["Computed"];
          el.legend = [
            {
              label: "Figure description",
              description: `The Prevalence of Undernourishment (PoU) is based on the distribution of habitual dietary energy consumption of hypothetical average individuals. The PoU calculates the probability that the habitual dietary energy consumption of individuals is
              below the lower limit of acceptable energy requirements to be in good health and have socially desirable physical activity. The methodology followed is explained in further detail in Annex 1B of FAO’s The State of Food Security and Nutrition in the World.`,
            },
            {
              key: "Computed",
              color: colors.computed,
              inLegend: true,
              inGraph: true,
            },
            {
              key: "< 2.5",
              color: colors.under,
              type: "under",
              inLegend: true,
              description:
                "FAO considers national level PoU estimates lower than 2.5 percent as being insufficiently reliable to be reported",
            },
            {
              key: "FABLE Target",
              color: "red",
              type: "mark",
              inLegend: true,
              description: "Below 5% of the population",
            },
          ];
          el.notes = `The prevalence of undernourishment assumes a lognormal distribution, defined by mean dietary energy consumption (DEC), CV (taken from the FAO and kept constant at 2020 levels), and MDER per capita`;
          el.axisY = "Prevalence of undernourishment (%)";
        }
        // Rows 13, 14, 15 and 16
        if (i == 3) {
          el.title = `Evolution of calories intake by country`;
          el.description = `The evolution of average daily intake of calories per capita by country, based on the 2020 baseline scenario`;
          el.legend = [
            {
              label: "Figure description",
              description: `<p>This figure illustrates changes in average per capita kilocalorie intake for each country compared to respective Minimum Dietary Energy Requirements (MDER).</p>
              <br />
              <p>The average per capita kilocalorie intake reflects actual food consumption when food waste is taken into account. Based on the FAO's definition of the population at risk of hunger (Cafiero, 2014) and in line with Sustainable Development Goal (SDG) 2, which aims to achieve universal food and nutrition security by 2030, FABLE's food security objective sets a target range of 10% to 50% above the MDER in all countries by 2030. The MDER represents the minimum caloric intake required for good health, varying by age, sex, and activity level.</p>
              <br />
              <p>Although this target does not address food access inequalities within countries, it serves as a clear and measurable benchmark for tracking progress toward global food security.</p>`,
            },
            {
              key: "Computed",
              color: colors.computed,
              inLegend: true,
              inGraph: true,
            },
            {
              key: `Upper bound target`,
              color: colors.upper,
              type: `upper`,
              description: `50% above the MDER`,
              inLegend: true,
            },
            {
              key: `Lower bound target`,
              color: colors.lower,
              type: `lower`,
              description: `10% above the MDER`,
              inLegend: true,
            },
            {
              key: `Historical`,
              color: colors.historical,
              type: `historical`,
              inLegend: true,
            },
          ];
          el.data.forEach((e) => {
            e.Computed = e["Kcal Feasability"];
            e["Upper bound target"] = e.upperBound;
            e["Lower bound target"] = e.lowerBound;
            delete e["Kcal Feasability"];
            delete e.upperBound;
            delete e.lowerBound;
          });
          el.notes = `Source: FAOSTAT is used for historical data, it is not accounting for food loss and waste and might be different than values on FAOSTAT because of merging differences`;
          el.keys = ["Computed"];
        }

        // console.table({
        //   indexInArray: i,
        //   title: el.title,
        //   description: el.description,
        // });
      }

      if (path == 2020 || path == 2021) {
        // Rows 44 to 48
        if (i === 0) {
          // Rows 44 and 45
          el.title = "Average daily intake per capita in 2030";
          el.legend = [
            {
              label: "Figure description",
              description: `<p>This figure compares the average per capita kilocalorie intake across listed countries and regions with their respective Minimum Dietary Energy Requirement (MDER) in 2030. </p>
              <br />
              <p>The average per capita kilocalorie intake reflects actual food consumption when food waste is taken into account. Based on the FAO's definition of the population at risk of hunger (Cafiero, 2014) and in line with Sustainable Development Goal (SDG) 2, which aims to achieve universal food and nutrition security by 2030, FABLE sets a target for average daily energy intake per capita that exceeds the MDER in each listed country and region by 2030. The MDER represents the minimum caloric intake required for good health, varying by age, sex, and activity level.</p>
              <br />
              <p>While this target does not address food access inequalities within countries, it provides a clear and measurable benchmark for assessing progress toward global food security.</p>`,
            },
            {
              key: "Computed",
              inGraph: true,
              inLegend: true,
              color: colors.computed,
            },
            {
              key: "MDER",
              inLegend: true,
              color: colors.upper,
              type: "lower",
            },
          ];
          el.keys = ["Computed"];
          el.data = el.data.map((e) => ({
            valueX: e.valueX,
            Computed: e["Kcal Feasability"],
            MDER: e.lowerBound,
          }));
        }
        if (i === 1) {
          // Rows 46, 47 and 48
          el.title = `Evolution of calories intake by country`;
          el.legend = [
            {
              label: "Figure description",
              description: `<p>This figure illustrates changes in average per capita kilocalorie intake for each listed country compared to respective Minimum Dietary Energy Requirements (MDER).</p>
              <br />
              <p>The average per capita kilocalorie intake reflects actual food consumption when food waste is taken into account. Based on the FAO's definition of the population at risk of hunger (Cafiero, 2014) and in line with Sustainable Development Goal (SDG) 2, which aims to achieve universal food and nutrition security by 2030, FABLE set a target average daily energy intake per capita that exceeds the MDER in listed country and region by 2030. The MDER represents the minimum caloric intake required for good health, varying by age, sex, and activity level.</p>
              <br />
              <p>While this target does not address food access inequalities within countries, it provides a clear and measurable benchmark for assessing progress toward global food security.<p>`,
            },
            {
              key: "Computed",
              inGraph: true,
              inLegend: true,
              color: colors.computed,
            },
            {
              key: "MDER",
              inLegend: true,
              color: colors.upper,
              type: "lower",
            },
            {
              key: "Historical",
              inLegend: true,
              color: colors.historical,
              type: "historical",
            },
          ];
          el.keys = ["Computed"];
          el.data.forEach((e) => {
            let data;
            if (path == 2020) data = data2020;
            if (path == 2021) data = data2021;
            const found = data?.find(
              (country) =>
                country.year === e.valueX &&
                country.location === e.location &&
                country.tradeadjustment === trade &&
                country.pathway_id === pathway,
            );
            e.Computed = e["Kcal Feasability"];
            e.MDER = found?.kcal_mder;
            delete e["Kcal Feasability"];
            delete e.lowerBound;
          });
        }
      }

      if (path == 2019) {
        // Rows 56, 57 and 58
        el.title = `Evolution of calories intake by country`;
        el.notes = `Source: FAOSTAT is used for historical data, it is not accounting for food loss and waste and might be different than values on FAOSTAT because of merging differences`;
        el.legend = [
          {
            label: "Figure description",
            description: `<p>This figure compares the average per capita kilocalorie intake across listed countries and regions with their respective Minimum Dietary Energy Requirement (MDER) in 2030. </p>
            <br />
            <p>The average per capita kilocalorie intake reflects actual food consumption when food waste is taken into account. Based on the FAO's definition of the population at risk of hunger (Cafiero, 2014) and in line with Sustainable Development Goal (SDG) 2, which aims to achieve universal food and nutrition security by 2030, FABLE sets a target for average daily energy intake per capita that exceeds the MDER in each listed country and region by 2030. The MDER represents the minimum caloric intake required for good health, varying by age, sex, and activity level.</p>
            <br />
            <p>While this target does not address food access inequalities within countries, it provides a clear and measurable benchmark for assessing progress toward global food security.</p>`,
          },
          {
            key: "Computed",
            inGraph: true,
            inLegend: true,
            color: colors.computed,
          },
          {
            key: "MDER",
            inLegend: true,
            color: colors.upper,
            type: "lower",
          },
        ];
        el.data.forEach((e) => {
          e["Computed"] = e["avg_intake"];
          e["MDER"] = e["lowerBound"];
          delete e.upperBound;
          delete e.lowerBound;
          delete e.avg_intake;
        });
        el.keys = ["Computed"];
      }
    });

    await fs.writeFile(
      `./src/data/tester/${final}`,
      JSON.stringify(file, null, 2),
    );
  }
})();
