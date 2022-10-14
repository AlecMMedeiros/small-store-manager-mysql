const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/database/connection');



describe('Verificação da camada "Sales Model"', function () {
  afterEach(sinon.restore)
  describe('Verificação da possibilidade de cadastrar vendas', function () {
    it('Verifica a funcionadalidade da função "insertSale', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
         
      const newSale = await salesModel.insertSale({
        productId: 1,
        quantity: 1
      })      
      expect(newSale).to.be.equal(1);    
    })
    it('Verifica a funcionadalidade da função "insertSaleProduct', async function () {
      sinon.stub(connection, 'execute').resolves([{ saleId: 1, productId: 1, quantity: 1 }]);

      const newSale = await salesModel.insertSaleProduct(1, {
        productId: 1,
        quantity: 1
      })    
      expect(newSale).to.be.deep.equal([{ saleId: 1, productId: 1, quantity: 1 }]);
    })
  })
  describe('Verificação da possibilidade de listar as vendas', function () {
    it('Verifica a funcionadalidade da função "listSaleProduct', async function () {
      sinon.stub(connection, 'execute').resolves([{ saleId: 1, productId: 1, quantity: 1 }]);

      const newSale = await salesModel.listSaleProduct(1)
      
      expect(newSale).to.be.deep.equal(([{ saleId: 1, productId: 1, quantity: 1 }]));
    })
    it('Verifica a funcionadalidade da função "listSaleDate', async function () {
      sinon.stub(connection, 'execute').resolves([{ id: 1, date: '2022-10-13 19:50:57' }]);

      const newSale = await salesModel.listSaleDate(1)

      expect(newSale).to.be.deep.equal([{ id: 1, date: '2022-10-13 19:50:57' }]);
    })
  })
})

