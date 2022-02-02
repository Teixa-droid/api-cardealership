import Express from "express";
import {getDB } from "../../db/db.js";


const vehicleRoutes = Express.Router();

vehicleRoutes.route('/vehicles').get((req, res) => {
  console.log("Someone get the route /vehicles");
  const dataBase = getDB();
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

vehicleRoutes.route('/vehicles/new').post((req, res) => {
  console.log(req);
  const vehiclesData = req.body;
  console.log("kkeys: ", Object.keys(vehiclesData));
  try {
    if (
      Object.keys(vehiclesData).includes("name") &&
      Object.keys(vehiclesData).includes("brand") &&
      Object.keys(vehiclesData).includes("model")
    ) {
      const dataBase = getDB();

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

vehicleRoutes.route('/vehicles/edit').patch((req, res) => {
  const edition = req.body;
  console.log(edition);
  const vehicleFilter = { _id: new ObjectId(edition.id) };
  delete edition.id;
  const operation = {
    $set: edition,
  };
  const dataBase = getDB();
  dataBase
    .collection('vehicle')
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

vehicleRoutes.route('/vehicles/delete').delete((req, res) => {
  const vehicleFilter = { _id: new ObjectId(req.body.id) };
  const dataBase = getDB();

  dataBase.collection("vehicle").deleteOne(vehicleFilter, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

export default vehicleRoutes;
