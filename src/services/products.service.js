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
  if (verify === undefined) return { code: 404, message: { message: 'Product not found' } };
  await productsModel.updateProduct(id, productName);
  const newProductResponse = await productsModel.listById(id);
  return { code: 200, message: newProductResponse };
};

const serviceDeleteProduct = async (productId) => {
  const verify = await productsModel.listById(productId);
  if (verify === undefined) return { code: 404, message: { message: 'Product not found' } };
  await productsModel.deleteProduct(productId);
  return { code: 204, message: `Product ${productId} was deleted` };
};

const serviceSearchProduct = async (name) => (name ? productsModel.searchProductByName(name)
  : productsModel.listAll());

module.exports = {
  serviceListAllProducts,
  serviceListByIdProducts,
  serviceInsertProduct,
  serviceUpdateProduct,
  serviceDeleteProduct,
  serviceSearchProduct,
};
