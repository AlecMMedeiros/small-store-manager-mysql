const express = require('express');
const { productsController } = require('../controllers');

const productsRoute = express.Router();

productsRoute.get('/', productsController.controllerListAllProducts);

productsRoute.get('/:id', productsController.controllerListByIdProducts);

productsRoute.post('/', productsController.controllerInsertProduct);
module.exports = {
  productsRoute,
};