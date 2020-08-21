/* eslint-disable no-undef */
process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')

let should = chai.should()

chai.use(chaiHttp)

const { PORT } = process.env
let app = 'http://localhost:' + PORT

let basePath = '/v1/user'

var data = require('./shared.js')

describe('Cleaning up', () => {
  it('destroy test user (coach)', (done) => {
    chai
      .request(app)
      .delete(basePath + '/' + data.coach.user._id)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        done()
      })
  })

  it('destroy test user (customer)', (done) => {
    chai
      .request(app)
      .delete(basePath + '/' + data.customer.user._id)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        done()
      })
  })

  it('destroy test user (contact)', (done) => {
    chai
      .request(app)
      .delete(basePath + '/' + data.contact.user._id)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        done()
      })
  })

  it('destroy test user (admin)', (done) => {
    chai
      .request(app)
      .delete(basePath + '/' + data.admin.user._id)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        done()
      })
  })
})
