import Express from "express";
import { queryAllVehicles, createVehicle } from "../../controllers/vehicles/controller.js";
import { getDB } from "../../db/db.js";

const vehicleRoutes = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error to connect the vehicles");
  } else {
    res.json(result);
  }
};

vehicleRoutes.route("/vehicles").get((req, res) => {
  console.log("Someone get the route /vehicles");
  queryAllVehicles(genericCallback(res));
});

vehicleRoutes.route("/vehicles/new").post((req, res) => {
  createVehicle(req.body, genericCallback(res));
});

vehicleRoutes.route("/vehicles/edit").patch((req, res) => {
  const edition = req.body;
  console.log(edition);
  const vehicleFilter = { _id: new ObjectId(edition.id) };
  delete edition.id;
  const operation = {
    $set: edition,
  };
  const dataBase = getDB();
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

vehicleRoutes.route("/vehicles/delete").delete((req, res) => {
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
