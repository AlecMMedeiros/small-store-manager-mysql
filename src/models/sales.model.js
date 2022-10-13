const camelize = require('camelize');
const connection = require('./database/connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insertSaleProduct = async (saleId, playload) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, playload.productId, playload.quantity],
  );
  return camelize(result);
};

const listSaleProduct = async (saleId) => {
 const result = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );
  return camelize(result);
};

module.exports = {
  insertSale,
  insertSaleProduct,
  listSaleProduct,
};
