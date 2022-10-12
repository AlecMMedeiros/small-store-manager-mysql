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

module.exports = {
  serviceListAllProducts,
  serviceListByIdProducts,
  serviceInsertProduct,
};
