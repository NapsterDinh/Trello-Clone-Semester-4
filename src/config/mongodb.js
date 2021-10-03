import { MongoClient } from "mongodb";
require("dotenv").config();

const uri = process.env.MONGODB_URI;

let dbInstance = null;

export const connectDB = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  //connect
  await client.connect();
  //assign clientDb to dbIntance
  dbInstance = client.db(process.env.DATABASE_NAME);
};

//get database

export const getDB = () => {
  if (!dbInstance) throw new Error("Must connect to Database first");
  return dbInstance;
};

// export default connectDB;
