import XLSX from "xlsx";
import path from "path";
import { promises as fsp } from "node:fs";

const file = path.join(__dirname, "scenathon_db2023_dc_v2.xlsx");

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
const json = excelToJson({ file, sheet: "Aggregated indicators" });

(async function () {
  await fsp
    .writeFile(`data-full.json`, JSON.stringify(json, null, 2))
    .catch((e) => console.error(`Something went wrong: ${e}`));
})();

console.log("Done");
