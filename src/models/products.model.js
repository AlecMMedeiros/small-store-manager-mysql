const camelize = require('camelize');
const connection = require('./database/connection');

const listAll = async () => {
  const result = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(result);  
};

const listById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(result);
};

const insertProduct = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [productName],
  );
  return insertId;
};

module.exports = {
  listAll,
  listById,
  insertProduct,
};
