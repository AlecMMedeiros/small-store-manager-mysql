const smallMap = {
  400: '"name" is required',
  422: '"name" length must be at least 5 characters long',
};

const smallMapNewSale = {
  404: 'Product not found',
  422: '"quantity" must be greater than or equal to 1',
  a400: '"productId" is required',
  b400: '"quantity" is required',
};

module.exports = {
  smallMap,
  smallMapNewSale,
};