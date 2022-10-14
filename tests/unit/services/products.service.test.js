const { expect } = require('chai');
const sino = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { listAllMock } = require('../Mocks/products.model.mock');

describe('Verificação da camada "Products Service"', function () {
  afterEach(sino.restore);
  describe('Verificação da funcionalidade de listar produtos através do usado da camada service', function () {
    it('Verifica de é possível listar todos os produtos através da "serviceListAllProducts"', async function () {
      sino.stub(productsService, 'serviceListByIdProducts').resolves(listAllMock);

      const serviceListAllProducts = await productsService.serviceListByIdProducts();     

      expect(serviceListAllProducts).to.be.deep.equal(listAllMock);
    });
    it('Verifica de é possível listar produtos através da ID usando "serviceListByIdProducts"', async function () {
      sino.stub(productsModel, 'listById').resolves(listAllMock[0]);

      const serviceListByIDProducts = await productsService.serviceListByIdProducts(1);

      expect(serviceListByIDProducts).to.be.deep.equal(listAllMock[0]);
    });
  });
  describe('Verificação da funcionalidade de inserir produtos através do usado da camada service', function () {
    it('Verifica de é possível cadastrar um novo produto via services"', async function () {
      sino.stub(productsModel, 'insertProduct').resolves([{ insertId: 1 }]);
      sino.stub(productsModel, 'listById').resolves(listAllMock[0]);

      const serviceInsertProduct = await productsService.serviceInsertProduct('Martelo de Thor');    

      expect(serviceInsertProduct).to.be.deep.equal(listAllMock[0]);
    });
  });
  describe('Verificação da funcionalidade de atualizar produtos através do usado da camada service', function () {
    it('Verifica de é possível cadastrar um novo produto via services"', async function () {
      const response = {
        id: 1,
        name: "Martelo do Batman"
      };
      sino.stub(productsModel, 'listById').onCall(0).resolves(listAllMock[0]).onCall(1).resolves(response)
      sino.stub(productsModel, 'updateProduct').resolves([{ insertId: 1 }]);

      const serviceInsertProduct = await productsService.serviceUpdateProduct({
        name: "Martelo do Batman"
      });

      expect(serviceInsertProduct.message).to.be.deep.equal(response);
    });
  });
});