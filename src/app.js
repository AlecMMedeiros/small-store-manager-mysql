const express = require('express');
const { productsRoute } = require('./routes/products.routes');

const app = express();
app.use(express.json());
app.use('/products', productsRoute);

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;