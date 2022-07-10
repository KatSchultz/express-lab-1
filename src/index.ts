import express from "express";
import cors from "cors";

import { itemRouter } from "../routes/routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/items", itemRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
