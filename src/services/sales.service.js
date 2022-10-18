const { salesModel, productsModel } = require('../models');

const serviceNewSale = async (payload) => {
  const products = await Promise.all(payload.map(
    async (item) => productsModel.listById(item.productId),
  ));
  const checkProductsExists = products.some((product) => product === undefined);
  if (checkProductsExists) return ({ message: 'Product not found' });
  const saleId = await salesModel.insertSale();
  await Promise.all(payload.map(
    async (item) => salesModel.insertSaleProduct(saleId, item),
  ));
  const [newSaleRegisterInfo] = await salesModel.listSaleProduct(saleId);
  const newSaleResponse = {
    id: saleId,
    itemsSold: newSaleRegisterInfo,
  };
  return newSaleResponse;
};

const serviceListSales = async (saleId) => { 
  const [byIdSales] = await salesModel.listSalesProductsBySalesId(saleId);
  if (byIdSales.length === 0) return { code: 404, message: { message: 'Sale not found' } };
  return { code: 200, message: byIdSales };
};

const serviceListAllSales = async () => {
 const [allSalles] = await salesModel.listAllSalesProducts(); 
  return { code: 200, message: allSalles };
};

const serviceDeleteSale = async (saleId) => {
  const [verifySale] = await salesModel.listSaleDate(saleId);
  if (verifySale.length === 0) return { code: 404, message: { message: 'Sale not found' } };
  await salesModel.deleteSale(saleId);
  return { code: 204, message: 'Sale was deleted successfully' };
};

const servicUpdateSale = async (saleId, payload) => {
  const [verifySale] = await salesModel.listSaleDate(saleId);
  if (verifySale.length === 0) return { code: 404, message: { message: 'Sale not found' } };
  const products = await Promise.all(payload.map(
    async (item) => productsModel.listById(item.productId),
  ));
  const checkProductsExists = products.some((product) => product === undefined);
  if (checkProductsExists) return { code: 404, message: { message: 'Product not found' } };
  await Promise.all(payload.map(
    async (item) => salesModel.updateSale(saleId, item),
  ));
  const [updatedInfo] = await salesModel.listSaleProduct(saleId);
  const updateSaleResponse = {
    saleId,
    itemsUpdated: updatedInfo,
  };
  return { code: 200, message: updateSaleResponse };
};

module.exports = {
  serviceNewSale,
  serviceListSales,
  serviceListAllSales,
  serviceDeleteSale,
  servicUpdateSale,
};
