const { smallMap } = require('../utils/mapError');

const getSalesErros = async (res, error) => {
  console.log(error);
  if (error === smallMap[400]) return res.status(400).json({ message: error });
  if (error === smallMap[422]) return res.status(422).json({ message: error });
};

module.exports = {
  getSalesErros,
};
