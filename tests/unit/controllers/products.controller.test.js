const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsController = require('../../../src/controllers/products.controller');
const { productsService } = require('../../../src/services');
const { listAllMock } = require('../Mocks/products.model.mock');


const { expect } = chai;
chai.use(sinonChai);

describe('Verificação da camada "Products Sevice" ', function () {
  afterEach(sinon.restore);
  it('Verifica se o listar todos os produtos, recebe-se a lista de produtos e o código de resposta 200', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'serviceListAllProducts')
      .resolves(listAllMock);

    await productsController.controllerListAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Verifica se ao listar os produtos pelo id, recebe-se a lista de produtos e o código de resposta 200', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'serviceListByIdProducts')
      .resolves(listAllMock[0]);

    await productsController.controllerListByIdProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listAllMock[0]);
  });
  it('Verifica se ao cadastrar um produto, recebe-se o resumo do novo prodito e o código de resposta 201', async function () {
    const res = {};
    const req = {
      body: {
        name: "ProdutoX"
      },
      params: {
        id: 1
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'serviceInsertProduct')
      .resolves({
        id: 4,
        name: "ProdutoX"
      });

    await productsController.controllerInsertProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);   
    expect(res.json).to.have.been.calledWith({ id: 4, name: "ProdutoX" });

  });
});