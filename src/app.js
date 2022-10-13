const express = require('express');
const { productsRoute } = require('./routes/products.routes');
const { salesRoute } = require('./routes/sales.routes');

const app = express();
app.use(express.json());
app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;