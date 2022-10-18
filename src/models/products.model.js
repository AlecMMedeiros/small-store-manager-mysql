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

const updateProduct = async (id, name) => connection
  .execute('UPDATE StoreManager.products SET name= ? WHERE id = ?',
    [name, id]);

const searchProductByName = async (name) => {
  const result = await connection
    .execute(`SELECT * FROM StoreManager.products WHERE LOWER(products.name) LIKE "%${name}%"`);
  
  return camelize(result);
};

const deleteProduct = async (productId) => connection
  .execute('DELETE FROM StoreManager.products WHERE id =?', [productId]);

module.exports = {
  listAll,
  listById,
  insertProduct,
  updateProduct,
  searchProductByName,
  deleteProduct,
  
};
