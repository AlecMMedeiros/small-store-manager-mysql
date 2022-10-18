const express = require('express');
const { salesController } = require('../controllers');

const salesRoute = express.Router();

salesRoute.put('/:id', salesController.controllerUpdateSale);
salesRoute.get('/:id', salesController.controllerListSaleById);

salesRoute.post('/', salesController.controllerNewSale);
salesRoute.get('/', salesController.controllerListAllSales);
salesRoute.delete('/:id', salesController.controllerDeleteSale);

module.exports = {
  salesRoute,
};
