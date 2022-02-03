import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const queryAllVehicles = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection("vehicle").find().limit(50).toArray(callback);
};

const createVehicle = async (vehicleData, callback) => {
  if (
    Object.keys(vehicleData).includes("name") &&
    Object.keys(vehicleData).includes("brand") &&
    Object.keys(vehicleData).includes("model")
  ) {
    const dataBase = getDB();

    await dataBase.collection("vehicle").insertOne(vehicleData, callback);
  } else {
    return "error";
  }
};

const editVehicle = async (id, edition, callback) => {
  const vehicleFilter = { _id: new ObjectId(edition.id) };
  const operation = {
    $set: edition,
  };
  const dataBase = getDB();
  await dataBase
    .collection("vehicle")
    .findOneAndUpdate(
      vehicleFilter,
      operation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const removeVehicle = async (id, callback) => {
  const vehicleFilter = { _id: new ObjectId(id) };
  const dataBase = getDB();

  await dataBase.collection("vehicle").deleteOne(vehicleFilter, callback);
};

export { queryAllVehicles, createVehicle, editVehicle, removeVehicle };
