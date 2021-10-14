import express from "express";
import { connectDB, getDB } from "./config/mongodb";
import cors from "cors";
import { api } from "./routes/index";
import { corsOptions } from "./config/cors";

require("dotenv").config();

const hostname = "localhost";
const port = 8017;

connectDB()
  .then(() => console.log("Connect success"))
  .then(() => bootServer())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use("/v1", api);

  app.listen(port, hostname, () => {
    console.log(`server run at ${hostname}:${port}`);
  });
};
