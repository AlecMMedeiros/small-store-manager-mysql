const { expect } = require('chai');
const sino = require('sinon');

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/database/connection');
const { listAllMock } = require('../Mocks/products.model.mock');


describe('Verificação da camada "Products Model"', function () {
  afterEach(sino.restore);
  describe('Verificação da funcionalidade de listagem de produtos', function () {
    it('Verifica se é possível listar todos os produtos através da função listAll', async function () {
      sino.stub(productsModel, 'listAll').resolves(listAllMock);
 
      const listAll = await productsModel.listAll();

      expect(listAll).to.be.deep.equal(listAllMock);
    })
    it('Verifica se é possível listar todos os produtos através da função listById', async function () {
      sino.stub(productsModel, 'listById').resolves(listAllMock[0]);
      
      const listById = await productsModel.listById(1);     

      expect(listById).to.be.deep.equal(listAllMock[0]);
    })    
  })
})

