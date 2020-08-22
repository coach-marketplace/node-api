let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)
const server = require('../../src/app')
let basePath = '/ping'
describe('Testing routes', () => {
  /**
   * Test Ping ==> Pong
   */
  describe('Ring..."ping" ==> "pong"', () => {
    it('Getting pong', (done) => {
      chai
        .request(server)
        .get(basePath)
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(200)
          res.text.should.be.a('string')
          res.text.should.equal('pong')
          done()
        })
    })
  })
})
