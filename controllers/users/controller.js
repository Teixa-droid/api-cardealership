import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";
import jwt_decode from 'jwt-decode';

const queryAllUsers = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection("user").find().limit(50).toArray(callback);
};

const createUser = async (userData, callback) => {
  const dataBase = getDB();
  await dataBase.collection("user").insertOne(userData, callback);
};

const viewUser = async (id, callback) => {
  const dataBase = getDB();
  await dataBase
    .collection("user")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const viewOrCreateUser = async (req, callback) => {
  // 6.1. obtener los datos del user desde el token
  const token = req.headers.authorization.split("Bearer ")[1];
  const user = jwt_decode(token)["http://localhost/userData"];
  console.log(user);

  // 6.2. con el correo del user o con el id de auth0, verificar si el user ya esta en la bd o no
  const dataBase = getDB();
  await dataBase
    .collection("user")
    .findOne({ email: user.email }, async (err, response) => {
      console.log("response consulta bd", response);
      if (response) {
        callback(err, response);
      } else {
        user.auth0ID = user._id;
        delete user._id;
        user.rol = "inactive";
        await createUser(user, (err, reply) => callback(err, user));
      }
    });
};

const editUser = async (id, edition, callback) => {
  const userFilter = { _id: new ObjectId(id) };
  const operation = {
    $set: edition,
  };
  const dataBase = getDB();
  await dataBase
    .collection("user")
    .findOneAndUpdate(
      userFilter,
      operation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const removeUser = async (id, callback) => {
  const userFilter = { _id: new ObjectId(id) };
  const dataBase = getDB();

  await dataBase.collection("user").deleteOne(userFilter, callback);
};

export {
  queryAllUsers,
  createUser,
  editUser,
  removeUser,
  viewUser,
  viewOrCreateUser,
};
