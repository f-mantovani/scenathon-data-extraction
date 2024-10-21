import XLSX from "xlsx";
import path from "path";
import { promises as fsp } from "node:fs";

const file = path.join(__dirname, "CT_After.xlsx");
// const file = path.join(__dirname, "CT_Before.xlsx");
// const file = path.join(__dirname, "Sust_After.xlsx");
// const file = path.join(__dirname, "Sust_Before.xlsx");

export const excelToJson = ({
  file,
  sheet,
}: {
  file: "string";
  sheet: "string";
}) => {
  // Get Excel file
  const workbook = XLSX.readFile(file).Sheets[sheet];

  // Convert worksheet to JSON
  return XLSX.utils.sheet_to_json(workbook);
};

console.log("Reading...");
const json = excelToJson({ file, sheet: "CT_After" });
// const json = excelToJson({ file, sheet: "CT_Before" });
// const json = excelToJson({ file, sheet: "Sust_After" });
// const json = excelToJson({ file, sheet: "Sust_Before" });

(async function () {
  await fsp
    .writeFile(
      `biodiversityData-temp.json`,
      JSON.stringify(
        { pathway_id: "CT", tradeadjustment: "Yes", data: json },
        // { pathway_id: "CT", tradeadjustment: "No", data: json },
        // { pathway_id: "GS", tradeadjustment: "Yes", data: json },
        // { pathway_id: "GS", tradeadjustment: "No", data: json },
        null,
        2
      )
    )
    .catch((e) => console.error(`Something went wrong: ${e}`));
})();

console.log("Done");
