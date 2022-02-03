import Express from "express";
import { queryAllVehicles, createVehicle, editVehicle } from "../../controllers/vehicles/controller.js";
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
  editVehicle(req.body, genericCallback(res));
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
