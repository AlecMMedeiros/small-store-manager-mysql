const express = require('express');
const { salesController } = require('../controllers');

const salesRoute = express.Router();

salesRoute.post('/', salesController.controllerNewSale);

module.exports = {
  salesRoute,
};
