/* // import express 
const express = require('express');
 */
// new way to import express
import Express from "express";
import dotenv from "dotenv";
import Cors from "cors";
import { connectDB } from "./db/db.js";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

import vehicleRoutes from "./views/vehicles/rotas.js";
import userRoutes from "./views/users/rotas.js";
import sailRoutes from "./views/sales/rotas.js";
import authorizationUserStateUser from './middleware/authorizationUserStateUser.js';

dotenv.config({ path: "./.env" });

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://cardealership.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "api-cardealership-autentication",
  issuer: "https://cardealership.eu.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.use(authorizationUserStateUser);

app.use(vehicleRoutes);
app.use(userRoutes);
app.use(sailRoutes);

const main = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Port ${process.env.PORT}`);
  });
};

connectDB(main);
