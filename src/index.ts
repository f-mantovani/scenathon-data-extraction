import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
import data from '../CT.json'


app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));