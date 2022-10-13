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
  const newSaleRegisterInfo = await salesModel.listSaleProduct(saleId);
  const itemsSold = [];
  newSaleRegisterInfo[0].map((item) => itemsSold
    .push({ productId: item.productId, quantity: item.quantity }));
  const newSaleResponse = {
    id: saleId,
    itemsSold,
  };
  return newSaleResponse;
};

module.exports = {
  serviceNewSale,
};
