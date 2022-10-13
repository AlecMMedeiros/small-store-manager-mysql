const { productsModel } = require('../models');

const serviceListAllProducts = async () => {
  const result = await productsModel.listAll();  
  return result;
};

const serviceListByIdProducts = async (productId) => {
  const result = await productsModel.listById(productId);
  return result;
};

const serviceInsertProduct = async (productName) => {
  const newProductId = await productsModel.insertProduct(productName);
  const newProductResponse = await productsModel.listById(newProductId);
  return newProductResponse;
};

const serviceUpdateProduct = async (id, productName) => {
  const verify = await productsModel.listById(id);
  if (verify === undefined) return verify;
  await productsModel.updateProduct(id, productName);
  const newProductResponse = await productsModel.listById(id);
  return newProductResponse;
};

module.exports = {
  serviceListAllProducts,
  serviceListByIdProducts,
  serviceInsertProduct,
  serviceUpdateProduct,
};
