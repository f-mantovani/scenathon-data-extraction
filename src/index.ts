import express from "express";
import morgan from "morgan";
import cors from "cors";
import { writeToFile } from "./data/produceJSON";
import type { Identifiers } from "./data/helpers/identifier";
import path from "node:path";
import compression from "compression";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(compression());

type QueryString = {
  pathway: "CT" | "NC" | "GS";
  adjustment: "Yes" | "No";
  year?: number;
  identifier: Identifiers;
  region?: string;
};

const pathways = ["CT", "NC", "GS"];
const adjustments = ["Yes", "No"];

app.get("/", async (req, res) => {
  const { pathway, adjustment, year, identifier, region } = req.query;

  if (
    typeof pathway !== "string" ||
    typeof adjustment !== "string" ||
    !pathways.includes(pathway) ||
    !adjustments.includes(adjustment)
  ) {
    console.log('invalid query');
    res.status(400).json({ error: "Invalid query" });
    return;
  }

  const filter = { pathway, adjustment, year, identifier, region } as QueryString;
  const data = await writeToFile(filter);
  res.json(data);
});

app.get('/test', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../CT-No-food_security.json.gz'))
})

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
