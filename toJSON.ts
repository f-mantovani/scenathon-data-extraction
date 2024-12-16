import XLSX from "xlsx";
import path from "path";
import { promises as fsp } from "node:fs";

const file = path.join(__dirname, "Scenathon2020DB_forFelipe.xlsx");

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
const json = excelToJson({ file, sheet: "Targets" });

(async function () {
  await fsp
    .writeFile(`2020-data-full.json`, JSON.stringify(json, null, 2))
    .catch((e) => console.error(`Something went wrong: ${e}`));
})();

console.log("Done");
