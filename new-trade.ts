import { locationConverter } from "./src/data/helpers/locationConverter";
import fs from "node:fs/promises";

const string =
  "https://fableapi.geo-wiki.org/v2/2020?identifier=trade&pathway=CT&adjustment=Yes";

const pathways = ["CT", "GS", "NC"];
const adjustments = ["Yes", "No"];

async function extract() {
  const response = await (await fetch(string)).json();
  console.log(response);
}

extract();
