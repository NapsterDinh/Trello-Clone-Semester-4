import express from "express";
import { connectDB, getDB } from "./config/mongodb";
import cors from "cors";
import { api } from "./routes/index";
import { corsOptions } from "./config/cors";
import fileupload from "express-fileupload";

// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;

connectDB()
  .then(() => console.log("Connect success"))
  .then(() => bootServer())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

console.log(process.env.PORT);

const bootServer = () => {
  const app = express();
  app.use(fileupload({ useTempFiles: true }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.static("public"));
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use("/v1", api);

  app.listen(port, hostname, () => {
    console.log(`server run at ${hostname}:${port}`);
  });
};
