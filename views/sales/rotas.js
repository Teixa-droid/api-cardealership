import Express from "express";
import {
  queryAllSales,
  createSale,
  editSale,
  removeSale,
  viewSale,
} from "../../controllers/sales/controller.js";

const saleRoutes = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error to connect the sales");
  } else {
    res.json(result);
  }
};

saleRoutes.route("/sales").get((req, res) => {
  console.log("Someone get the route /sales");
  queryAllSales(genericCallback(res));
});

saleRoutes.route("/sales").post((req, res) => {
  createSale(req.body, genericCallback(res));
});

saleRoutes.route("/sales/:id").get((req, res) => {
  console.log('someone did "get" on the road /sales');
  viewSale(req.params.id, genericCallback(res));
});

saleRoutes.route("/sales/:id").patch((req, res) => {
  editSale(req.params.id, req.body, genericCallback(res));
});

saleRoutes.route("/sales/:id").delete((req, res) => {
  removeSale(req.params.id, genericCallback(res));
});

export default saleRoutes;
