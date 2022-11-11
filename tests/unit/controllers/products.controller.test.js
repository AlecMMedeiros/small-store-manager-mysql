const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsController = require('../../../src/controllers/products.controller');
const { productsService } = require('../../../src/services');
const { listAllMock } = require('../Mocks/products.model.mock');


const { expect } = chai;
chai.use(sinonChai);

describe('Verificação da camada "Products controller" ', function () {
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
  it('Verifica se ao cadastrar um produto, recebe-se o resumo do novo produto e o código de resposta 201', async function () {
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
  it('Verifica se ao cadastrar um produto sem o nome, recebe-se o código de resposta 400', async function () {
    const res = {};
    const req = {
      body: {
      },
      params: {
        id: 1
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.controllerInsertProduct(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"name" is required' });

  });
  it('Verifica se ao cadastrar um produto o tamanho do nome menor do que 5 caracters, recebe-se o código de resposta 422', async function () {
    const res = {};
    const req = {
      body: {
        name: "Min"
      },
      params: {
        id: 1
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.controllerInsertProduct(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.be.calledWith({ message: '"name" length must be at least 5 characters long' });

  });
  it('Verifica se ao atualizar um produto, recebe-se o resumo do novo produto e o código de resposta 200', async function () {
    const res = {};
    const req = {
      body: {
        name: "Martelo do Batman"
      },
      params: {
        id: 1
      },
    };

    const response = {
      code: 200,
      message: {
        id: 1,
        name: "Martelo do Batman"
      },
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'serviceUpdateProduct')
      .resolves(response);

    await productsController.controllerUpdateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: "Martelo do Batman" });

  });
  it('Verifica se ao atualizar um produto, recebe-se o resumo do novo produto e o código de resposta 200', async function () {
    const res = {};
    const req = {
      body: {
        name: "Martelo do Batman"
      },
      params: {
        id: 1
      },
    };

    const response = {
      code: 200,
      message: {
        id: 1,
        name: "Martelo do Batman"
      },
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'serviceUpdateProduct')
      .resolves(response);

    await productsController.controllerUpdateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: "Martelo do Batman" });

  });
  it('Verifica se ao atualizar um produto sem o nome, recebe-se o resumo do novo produto e o código de resposta 400', async function () {
    const res = {};
    const req = {
      body: {
      },
      params: {
        id: 1
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.controllerUpdateProduct(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });

  });
  it('Verifica se ao atualizar um produto com o tamanho do nome menor que 5 caracteres, recebe-se o resumo do novo produto e o código de resposta 422', async function () {
    const res = {};
    const req = {
      body: {
        name: "Min"
      },
      params: {
        id: 1
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.controllerUpdateProduct(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });

  });
  it('Verifica se ao deletar um produto, recebe-se o código de resposta 204', async function () {
    const res = {};
    const req = {
      params: {
        id: 4
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.controllerDeleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });
  it('Verifica se ao buscar um produto usando um texto, recebe-se o código de resposta 200 e o resumo do produto', async function () {
    const res = {};
    const req = {
      query: { q: "Martelo" }
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.controllerSeachProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });
});