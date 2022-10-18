const express = require('express');
const { salesController } = require('../controllers');

const salesRoute = express.Router();

salesRoute.get('/:id', salesController.controllerListSaleById);
salesRoute.put('/:id', salesController.controllerUpdateSale);
salesRoute.get('/', salesController.controllerListAllSales);

salesRoute.post('/', salesController.controllerNewSale);
salesRoute.delete('/:id', salesController.controllerDeleteSale);

module.exports = {
  salesRoute,
};
