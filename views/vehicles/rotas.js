import Express from "express";
import {
  queryAllVehicles,
  createVehicle,
  editVehicle,
  removeVehicle,
  viewVehicle
} from "../../controllers/vehicles/controller.js";

const vehicleRoutes = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    console.log('error', err);
    res.status(500).json({ error: err });
  } else {
    res.json(result);
  }
};

vehicleRoutes.route("/vehicles").get((req, res) => {
  console.log("Someone get the route /vehicles");
  queryAllVehicles(genericCallback(res));
});

vehicleRoutes.route("/vehicles").post((req, res) => {
  createVehicle(req.body, genericCallback(res));
});

vehicleRoutes.route("/vehicles/:id").get((req, res) => {
  console.log('someone did "get" on the road /vehicles');
  viewVehicle(req.params.id, genericCallback(res));
});

vehicleRoutes.route("/vehicles/:id").patch((req, res) => {
  editVehicle(req.params.id,req.body, genericCallback(res));
});

vehicleRoutes.route("/vehicles/:id").delete((req, res) => {
  removeVehicle(req.params.id, genericCallback(res));
});

export default vehicleRoutes;
