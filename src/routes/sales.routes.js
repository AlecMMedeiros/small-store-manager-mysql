const express = require('express');
const { salesController } = require('../controllers');

const salesRoute = express.Router();

salesRoute.get('/:id', salesController.controllerListSaleById);

salesRoute.post('/', salesController.controllerNewSale);
salesRoute.get('/', salesController.controllerListAllSales);

module.exports = {
  salesRoute,
};
