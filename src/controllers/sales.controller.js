const { SalesMiddlewares } = require('../middlewares');
const { saleSchema } = require('../middlewares/schemas');
const { salesService } = require('../services');

const controllerNewSale = async (req, res) => {
  const payload = req.body;

  const [getErrors] = payload.map((item) => saleSchema.validate(item, { abortEarly: false }));
  if (getErrors.error) {
    const wrongResponse = SalesMiddlewares
      .getSalesErros(res, Object.values(getErrors)[1].details[0].message);
    return wrongResponse;
  }
  const newSale = await salesService.serviceNewSale(payload); 
  return newSale.message === 'Product not found' ? res.status(404).json(newSale)
    : res.status(201).json(newSale);
};

const controllerListSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.serviceListSales(id); 

  return res.status(result.code).json(result.message);
};

const controllerListAllSales = async (_req, res) => {
  const getAllSales = await salesService.serviceListAllSales();

  return res.status(getAllSales.code).json(getAllSales.message);
};

module.exports = {
  controllerNewSale,
  controllerListSaleById,
  controllerListAllSales,
};