/* // import express 
const express = require('express');
 */
// new way to import express
import Express from "express";
import dotenv from "dotenv";
import Cors from "cors";
import { connectDB } from "./db/db";

dotenv.config({ path: "./.env" });

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get("/vehicles", (req, res) => {
  console.log("Someone get the route /vehicles");
  dataBase
    .collection("vehicle")
    .find({})
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send("Error to connect the vehicles");
      } else {
        res.json(result);
      }
    });
});

app.post("/vehicles/new", (req, res) => {
  console.log(req);
  const vehiclesData = req.body;
  console.log("kkeys: ", Object.keys(vehiclesData));
  try {
    if (
      Object.keys(vehiclesData).includes("name") &&
      Object.keys(vehiclesData).includes("brand") &&
      Object.keys(vehiclesData).includes("model")
    ) {
      dataBase.collection("vehicle").insertOne(vehiclesData, (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(200);
        }
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.patch("/vehicles/edit", (req, res) => {
  const edition = req.body;
  console.log(edition);
  const vehicleFilter = { _id: new ObjectId(edition.id) };
  delete edition.id;
  const operation = {
    $set: edition,
  };
  dataBase
    .collection("vehicle")
    .findOneAndUpdate(
      vehicleFilter,
      operation,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error("error to update vehicle", err);
          res.sendStatus(500);
        } else {
          console.log("update with success");
          res.sendStatus(200);
        }
      }
    );
});

app.delete("/vehicles/delete", (req, res) => {
  const vehicleFilter = { _id: new ObjectId(req.body.id) };
  dataBase.collection("vehicle").deleteOne(vehicleFilter, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

const main = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Port ${process.env.PORT}`);
  });
};

main();
