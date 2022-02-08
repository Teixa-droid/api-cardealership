import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const queryAllSales = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection("sale").find().limit(50).toArray(callback);
};

const createSale = async (saleData, callback) => {
  const dataBase = getDB();
  await dataBase.collection("sale").insertOne(saleData, callback);
};

const viewSale = async (id, callback) => {
  const dataBase = getDB();
  await dataBase
    .collection("sale")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const editSale = async (id, edition, callback) => {
  const saleFilter = { _id: new ObjectId(edition.id) };
  const operation = {
    $set: edition,
  };
  const dataBase = getDB();
  await dataBase
    .collection("sale")
    .findOneAndUpdate(
      saleFilter,
      operation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const removeSale = async (id, callback) => {
  const saleFilter = { _id: new ObjectId(id) };
  const dataBase = getDB();

  await dataBase.collection("sale").deleteOne(saleFilter, callback);
};

export { queryAllSales, createSale, editSale, removeSale, viewSale };
