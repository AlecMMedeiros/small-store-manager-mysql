const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const  salesController  = require('../../../src/controllers/sales.controller');

const { salesService } = require('../../../src/services');


const { expect } = chai;
chai.use(sinonChai);

describe('Verificação da camada "Sales controller" ', function () {
  afterEach(sinon.restore);
  it('Verifica se ao cadastrar uma venda com sucesso, recebe-se o código de resposta 201', async function () {
    const res = {};
    const req = {
      body: [{ productId: 1,  quantity: 1 }]     
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'serviceNewSale')
      .resolves([{
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 1
          }
        ]
      }]);
    
    console.log(req);

    await salesController.controllerNewSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith([{
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 1
        }
      ]
    }]);

  });
});