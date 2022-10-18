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
    `SELECT product_id, quantity FROM sales_products 
    WHERE sale_id = ?`, [saleId],
  );
  return camelize(result);
};

const listSaleDate = async (saleId) => {
  const result = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
  return camelize(result);
};

const listAllSalesDate = async () => {
  const result = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  return camelize(result);
};

const listSalesProductsBySalesId = async (saleId) => {
  const result = await connection.execute(
    `SELECT DISTINCT date, product_id, quantity 
    FROM StoreManager.sales_products, StoreManager.sales 
    WHERE sale_id = ? ORDER BY product_id`,
    [saleId],
  );
  return camelize(result);
};

const listAllSalesProducts = async () => {
  const result = await connection.execute(
    `SELECT sale_id, date, product_id, quantity FROM sales_products, sales 
    WHERE sale_id = sales.id`,
  );
  return camelize(result);
};

const deleteSale = async (saleId) => {
  connection.execute('DELETE FROM StoreManager.sales WHERE id = ?',
  [saleId]);
};

const updateSale = async (saleId, payload) => {
  await connection.execute(`UPDATE StoreManager.sales_products SET quantity = ? 
  WHERE sale_id = ? AND product_id = ? `, 
    [payload.quantity, saleId, payload.productId]);
};

module.exports = {
  insertSale,
  insertSaleProduct,
  listSaleProduct,
  listSaleDate,
  listAllSalesDate,
  listSalesProductsBySalesId,
  listAllSalesProducts,
  deleteSale,
  updateSale,

};
