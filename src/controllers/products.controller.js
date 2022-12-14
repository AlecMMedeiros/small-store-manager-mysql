const { productSchema } = require('../middlewares/schemas');
const { productsService } = require('../services');
const { smallMap } = require('../utils/mapError');

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
  const payload = req.body;
  const getErrors = await productSchema.validate(payload, { abortEarly: false });
  if (getErrors.error) {
    const error = getErrors.error.details[0].message;
    if (error === smallMap[400]) return res.status(400).json({ message: error });
    if (error === smallMap[422]) return res.status(422).json({ message: error });
  }
  const controllerInserProduct = await productsService.serviceInsertProduct(payload.name);
  return res.status(201).json(controllerInserProduct);
};

const controllerUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const getErrors = productSchema.validate(payload, { abortEarly: false });
  if (getErrors.error) {
    const error = getErrors.error.details[0].message;
    if (error === smallMap[400]) return res.status(400).json({ message: error });
    if (error === smallMap[422]) return res.status(422).json({ message: error });
  }
  const result = await productsService.serviceUpdateProduct(id, payload.name); 
  return res.status(result.code).json(result.message);
};

const controllerDeleteProduct = async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await productsService.serviceDeleteProduct(id);
  return res.status(deleteProduct.code).json(deleteProduct.message);
};

const controllerSeachProduct = async (req, res) => {
  const { q } = req.query;
  const [result] = await productsService.serviceSearchProduct(q);
  return res.status(200).json(result);
};

module.exports = {
  controllerListAllProducts,
  controllerListByIdProducts,
  controllerInsertProduct,
  controllerUpdateProduct,
  controllerDeleteProduct,
  controllerSeachProduct,
};
