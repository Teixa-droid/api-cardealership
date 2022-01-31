/* // import express 
const express = require('express');
 */

// new way to import express
import Express from 'express';

const app = Express();
app.use(Express.json());
app.get('/vehicles', (req, res) => {
  console.log('Someone get the route /vehicles');
  const vehicles = [
    { name: 'corolla', brand: 'toyota', model: '2014' },
    { name: 'yaris', brand: 'toyota', model: '2020' },
    { name: 'fiesta', brand: 'ford', model: '2020' },
    { name: 'cx30', brand: 'mazda', model: '2020' },
  ];
  res.send(vehicles);
});

app.post('/vehicles/new', (req, res) => {
  console.log(req);
  const vehiclesData = req.body;
  console.log('kkeys: ', Object.keys(vehiclesData));
  try {
    if (
      Object.keys(vehiclesData).includes('name') &&
      Object.keys(vehiclesData).includes('brand') &&
      Object.keys(vehiclesData).includes('model')
    ) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log('Port 5000');
});
