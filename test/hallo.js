var expect = require('chai').expect

module.exports = function () {
  describe('Halo', function () {
    context('CRUD', function () {
      it('should create', function () {
        expect('create').to.equal('crete')
      })
      it('should deleete', function () {
        expect('del').to.equal('del')
      })
    })
  })
}
