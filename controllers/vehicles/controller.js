import { getDB } from '../../db/db.js';

const queryAllVehicles = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection('vehicle').find().limit(50).toArray(callback);
};

const createVehicle = async (vehicleData, callback) => {
  if (
    Object.keys(vehicleData).includes('name') &&
    Object.keys(vehicleData).includes('brand') &&
    Object.keys(vehicleData).includes('model')
  ) {
    const dataBase = getDB();

    dataBase.collection('vehicle').insertOne(vehicleData, callback);
  } else {
    return 'error';
  }
};

export { queryAllVehicles, createVehicle };
