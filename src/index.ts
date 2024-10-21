import express from "express";
import morgan from "morgan";
import cors from "cors";
import { sendDataAndWriteToFile } from "./data/sendData";
import type { Identifiers } from "./data/helpers/identifier";
import path from "node:path";
import compression from "compression";
import { glob } from "glob";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(compression());

type QueryString = {
  pathway: "CT" | "NC" | "GS";
  adjustment: "Yes" | "No";
  identifier: "food_security" | "land";
};

const pathways = ["CT", "NC", "GS"];
const adjustments = ["Yes", "No"];

app.get("/:year", async (req, res) => {
  const { pathway, tradeadjustment, identifier } = req.query;
  const { year } = req.params;
  const string = `${year}-${identifier}-${pathway}-${tradeadjustment}.json`;

  // const files = (
  //   await glob(`./src/data/store/${string}`, { ignore: "node_modules/**" })
  // )[0];

  // if (files) {
  //   return res.sendFile(path.join(__dirname, `../src/data/store/${string}`));
  // }

  if (
    typeof pathway !== "string" ||
    typeof tradeadjustment !== "string" ||
    !pathways.includes(pathway) ||
    !adjustments.includes(tradeadjustment)
  ) {
    console.log("invalid query");
    res.status(400).json({ error: "Invalid query" });
    return;
  }

  const filter = { year, pathway, adjustment: tradeadjustment, identifier } as QueryString;
  // @ts-expect-error
  const data = await sendDataAndWriteToFile(filter);
  res.json(data);
});

app.get("/test", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../CT-No-food_security.json.gz"));
});

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
