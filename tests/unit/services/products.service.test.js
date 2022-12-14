const { expect } = require('chai');
const sino = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { listAllMock } = require('../Mocks/products.model.mock');

describe('Verificação da camada "Products Service"', function () {
  afterEach(sino.restore);
  describe('Verificação da funcionalidade de listar produtos através do usado da camada service', function () {
    it('Verifica de é possível listar todos os produtos através da "serviceListAllProducts"', async function () {
      sino.stub(productsModel, 'listAll').resolves(listAllMock);

      const serviceListAllProducts = await productsService.serviceListAllProducts();

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
  describe('Verificação da funcionalidade de deletar produtos através do usado da camada service', function () {
    it('Verifica de é possível deletar um produto não cadastrado"', async function () {
      const response = { message: 'Product not found' };

      sino.stub(productsModel, 'listById').resolves(undefined);


      const deleteProduct = await productsService.serviceUpdateProduct(99);

      expect(deleteProduct.message).to.be.deep.equal(response);
    });
    it('Verifica de é possível deletar um produto cadastrado"', async function () {
      const { message } = { message: `Product 1 was deleted` };
      const responseMock = [
        {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          info: '',
          serverStatus: 2,
          warningStatus: 0
        },
        undefined
      ];
      sino.stub(productsModel, 'listById').resolves(listAllMock[0]);
      sino.stub(productsModel, 'deleteProduct').resolves(responseMock);


      const deleteProduct = await productsService.serviceDeleteProduct(1);

      expect(deleteProduct.message).to.be.deep.equal(message);
    });
  });

});