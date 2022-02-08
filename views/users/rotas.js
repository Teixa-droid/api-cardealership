import Express from "express";
import {
  queryAllUsers,
  createUser,
  editUser,
  removeUser,
  viewUser,
  viewOrCreateUser,
} from "../../controllers/users/controller.js";

const userRoutes = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error to connect the users");
  } else {
    res.json(result);
  }
};

userRoutes.route("/users").get((req, res) => {
  console.log("Someone get the route /users");
  queryAllUsers(genericCallback(res));
});

userRoutes.route("/users").post((req, res) => {
  createUser(req.body, genericCallback(res));
});

userRoutes.route("/users/self").get((req, res) => {
  console.log('someone did "get" on the road /users/self');
  viewOrCreateUser(req, genericCallback(res));
});

userRoutes.route("/users/:id").get((req, res) => {
  console.log('someone did "get" on the road /users');
  viewUser(req.params.id, genericCallback(res));
});

userRoutes.route("/users/:id").patch((req, res) => {
  editUser(req.params.id, req.body, genericCallback(res));
});

userRoutes.route("/users/:id").delete((req, res) => {
  removeUser(req.params.id, genericCallback(res));
});

export default userRoutes;
