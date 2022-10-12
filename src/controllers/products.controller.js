const { productsService } = require('../services');

const controllerListAllProducts = async (_req, res) => {
  const [result] = await productsService.serviceListAllProducts();
  return res.status(200).json(result);
};

const controllerListByIdProducts = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.serviceListByIdProducts(id);
  return result ? res.status(200).json(result)
    : res.status(404).json({ message: 'Product not found' });
};

const controllerInsertProduct = async (req, res) => {
  const { name } = req.body;
  const controllerInserProduct = await productsService.serviceInsertProduct(name);
  return res.status(201).json(controllerInserProduct);
};

module.exports = {
  controllerListAllProducts,
  controllerListByIdProducts,
  controllerInsertProduct,
};
