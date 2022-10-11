const { productsModel } = require('../models');

const serviceListAllProducts = async () => {
  const result = await productsModel.listAll();  
  return result;
};

const serviceListByIdProducts = async (productId) => {
  const result = await productsModel.listById(productId);
  return result;
};

module.exports = {
  serviceListAllProducts,
  serviceListByIdProducts,
};
