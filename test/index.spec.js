// import first from './suites/first.test';
// import second from './suites/second.test';
// import third from './suites/third.test';
var expect = require('chai').expect

describe('API', function () {
  context('ctx 1', function () {
    it('should be ok 1', function () {
      expect(1).to.equal(1)
    })
    it('should be ok 2', function () {
      expect(5).to.equal(5)
    })
  })

  context('parti 1', require('./01-ping/ping'))

  // describe('Ping th app', first.bind(this));
  // describe('second suite', second.bind(this));
  // describe('third suite', third.bind(this));
})
