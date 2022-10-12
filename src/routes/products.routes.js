const express = require('express');
const { productsController } = require('../controllers');

const productsRoute = express.Router();

productsRoute.post('/', productsController.controllerInsertProduct);

productsRoute.get('/', productsController.controllerListAllProducts);

productsRoute.get('/:id', productsController.controllerListByIdProducts);

module.exports = {
  productsRoute,
};