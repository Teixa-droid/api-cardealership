import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const stringConnection = process.env.DATABASE_URL;

const client = new MongoClient(stringConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dataBase;

const connectDB = (callback) => {
    client.connect((err, db) => {
      if (err) {
        console.error("error to connect to db");
        return "error";
      }
      dataBase = db.db("cardealership");
      console.log("dataBase up");
      return;
      
    });
};

const getDB = () => {
  return dataBase;
};

export { connectDB, getDB };
