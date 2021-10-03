import express from "express";
import { connectDB, getDB } from "./config/mongodb";
// import getDB from "./config/mongodb";
// import { BoardModel } from "./models/board.model";
import { api } from "./routes/index";

require("dotenv").config();

const hostname = "localhost";
const port = 8017;

const app = express();
connectDB()
  .then(() => console.log("Connect success"))
  .then(() => bootServer())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const bootServer = () => {
  app.use(express.json());
  app.use("/v1", api);

  app.listen(port, hostname, () => {
    console.log(`server run at ${hostname}:${port}`);
  });
};
