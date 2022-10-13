const { smallMapNewSale } = require('../utils/mapError');

const getSalesErros = async (res, getErrors) => {  
  if (getErrors === smallMapNewSale.a400) return res.status(400).json({ message: getErrors });
  if (getErrors === smallMapNewSale.b400) return res.status(400).json({ message: getErrors });
  if (getErrors === smallMapNewSale[422]) return res.status(422).json({ message: getErrors });
};

module.exports = {
  getSalesErros,
};
