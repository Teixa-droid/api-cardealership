/* // import express 
const express = require('express');
 */
// new way to import express
import Express from "express";
import dotenv from "dotenv";
import Cors from "cors";
import { connectDB } from "./db/db.js";
import vehicleRoutes from "./views/vehicles/rotas.js";

dotenv.config({ path: "./.env" });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(vehicleRoutes);

const main = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Port ${process.env.PORT}`);
  });
};

connectDB(main);
