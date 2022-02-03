import Express from "express";
import {
  queryAllVehicles,
  createVehicle,
  editVehicle,
  removeVehicle
} from "../../controllers/vehicles/controller.js";

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
  removeVehicle(req.body.id, genericCallback(res));
});

export default vehicleRoutes;
