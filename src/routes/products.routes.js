const express = require('express');
const { productsController } = require('../controllers');

const productsRoute = express.Router();

productsRoute.delete('/:id', productsController.controllerDeleteProduct);
productsRoute.put('/:id', productsController.controllerUpdateProduct);
productsRoute.get('/:id', productsController.controllerListByIdProducts);
productsRoute.get('/', productsController.controllerListAllProducts);

productsRoute.post('/', productsController.controllerInsertProduct);
module.exports = {
  productsRoute,
};