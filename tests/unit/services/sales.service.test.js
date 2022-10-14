const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');


describe('Verificação da camada "Sales Service"', function () {
  afterEach(sinon.restore);
  describe('Verifica se é possível cadastrar vendas através da camada service', function () {
    it('Verifica se é possível cadastar a venda de 01 unidade de um item específico', async function () {
      sinon.stub(salesModel, 'insertSale').resolves(1);
      sinon.stub(salesModel, 'insertSaleProduct').resolves(([{ saleId: 1, productId: 1, quantity: 1 }]));
      sinon.stub(salesModel, 'listSaleProduct').resolves([[{ productId: 1, quantity: 1 }]]);
      const payload = [{
        productId: 1,
        quantity: 1
      }]
      const newSale = await salesService.serviceNewSale(payload);
      expect(newSale).to.be.deep.equal({
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 1
          }
        ]
      });
    })
  })
  it('Verifica se é possível cadastar a venda de 01 unidade de dois itens específicos', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(1);
    sinon.stub(salesModel, 'insertSaleProduct')
      .onCall(0).resolves(([{ saleId: 1, productId: 1, quantity: 1 }])).onCall(1).resolves(([{ saleId: 1, productId: 2, quantity: 5 }]))
    sinon.stub(salesModel, 'listSaleProduct').resolves([[{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]]);
    const payload = [
      {
        productId: 1,
        quantity: 1
      },
      {
        productId: 2,
        quantity: 5
      }
    ]
    const newSale = await salesService.serviceNewSale(payload);
    expect(newSale).to.be.deep.equal({
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 5
        }
      ]
    });
  })
  it('Verifica se é possível cadastar a venda de 01 unidade de um item que não existe no banco de dados', async function () {
    sinon.stub(productsModel, 'listById').resolves();
    sinon.stub(salesModel, 'insertSale').resolves(1);
    sinon.stub(salesModel, 'insertSaleProduct').resolves(([{ saleId: 1, productId: 1, quantity: 1 }]))
    sinon.stub(salesModel, 'listSaleProduct').resolves([[{ productId: 1, quantity: 1 }]]);

    const payload = [
      {
        productId: 999,
        quantity: 1
      }
    ]

    const expectResponse = { message: 'Product not found' };

    const newSale = await salesService.serviceNewSale(payload);

    expect(newSale).to.be.deep.equal(expectResponse);
  })
  it('Verifica se é possível cadastar a venda de 01 unidade de um item que existe no banco de dados', async function () {
    sinon.stub(productsModel, 'listById').resolves({
      id: 1,
      name: "Martelo de Thor"
    });
    sinon.stub(salesModel, 'insertSale').resolves(1);
    sinon.stub(salesModel, 'insertSaleProduct').resolves(([{ saleId: 1, productId: 1, quantity: 1 }]))
    sinon.stub(salesModel, 'listSaleProduct').resolves([[{ productId: 1, quantity: 1 }]]);

    const payload = [
      {
        productId: 1,
        quantity: 1
      }
    ]

    const newSale = await salesService.serviceNewSale(payload);

    expect(newSale).to.be.deep.equal({
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 1
        }
      ]
    });
  })
  describe('Verifica se é possível listar as vendas através da camada service', function () {
    it('Verifica se é possível listar venda através do id', async function () {  
      const response = [{
        date: '2022-10-13 19:50:57',
        productId: 1,
        quantity: 1,
      }]
      sinon.stub(salesModel, 'listSalesProductsBySalesId').resolves([response]);
      const newSale = await salesService.serviceListSales(1);
      expect(newSale.message).to.be.deep.equal(response);
    })
    it('Verifica se é possível listar venda através de id inexistente', async function () {
      sinon.stub(salesModel, 'listSaleDate').resolves([[undefined]]);
      sinon.stub(salesModel, 'listSaleProduct').resolves([[{ saleId: 1, productId: 1, quantity: 1 }]]);
      const response = { "message": "Sale not found" }
      const newSale = await salesService.serviceListSales(99);
      expect(newSale.message).to.be.deep.equal(response);
    })
  })
})

