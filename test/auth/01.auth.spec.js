/* eslint-disable no-undef */
const chai = require('chai')

const chaiHttp = require('chai-http')

// eslint-disable-next-line no-unused-vars
const server = require('../../src/server.js')

const { editUser } = require('../../src/controllers/user/handlers')

const should = chai.should()

chai.use(chaiHttp)

//  import dummy data
const data = require('../dummyDB/shared.js')

const application = require('../../src/app')

const { PORT } = process.env

const app = `http://localhost:${PORT}`

const basePath = '/v1/auth'

describe('Test endpoint ==> api/v1/auth/register-local', () => {
  /*
   * Test Register Customer
   */
  it('Ensure creating new user (customer) is working on register-local ', (done) => {
    chai
      .request(app)
      .post(basePath + '/register-local')
      .send(data.customer)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.email.should.equal(data.customer.email)
        res.body.isCoach.should.equal(false)
        res.body.isAdmin.should.equal(false)
        res.body.isArchived.should.equal(false)
        data.customer.user = res.body
        done()
      })
  })
  /*
   * Test Register Admin
   */
  it('Ensure creating new user (admin) is working on register-local', (done) => {
    chai
      .request(app)
      .post(basePath + '/register-local')
      .send(data.admin)
      .end(async (err, res) => {
        should.not.exist(err)
        res.should.have.status(201)
        res.body.should.be.a('object')
        await editUser(res.body._id, { isAdmin: true })
        res.body.email.should.equal(data.admin.email)
        data.admin.user = res.body
        done()
      })
  })
  /*
   * Test Register Coach
   */
  it('Ensure creating new user (coach) is working on register-local', (done) => {
    chai
      .request(app)
      .post(basePath + '/register-local')
      .send(data.coach)
      .end(async (err, res) => {
        should.not.exist(err)
        res.should.have.status(201)
        res.body.should.be.a('object')
        await editUser(res.body._id, { isCoach: true })
        res.body.email.should.equal(data.coach.email)
        data.coach.user = res.body
        done()
      })
  })
})
describe('Test endpoint ==> api/v1/auth/login-local', () => {
  /*
   * Test Log in Customer
   */
  it('Ensure Log in user (Customer) is working on login-local', (done) => {
    chai
      .request(app)
      .post(basePath + '/login-local')
      .send({
        email: data.customer.email,
        password: data.customer.password,
      })
      .end(async (err, res) => {
        should.not.exist(err)
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.token.should.match(/^Bearer/g)
        data.coach.user = res.body
        done()
      })
  })
  /*
   * Test Log in Coach
   */
  it('Ensure Log in user (coach) is working on login-local', (done) => {
    chai
      .request(app)
      .post(basePath + '/login-local')
      .send({
        email: data.coach.email,
        password: data.coach.password,
      })
      .end(async (err, res) => {
        should.not.exist(err)
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.token.should.match(/^Bearer/g)
        data.coach.user = res.body
        done()
      })
  })
  /*
   * Test Log in Admin
   */
  it('Ensure Log in user (admin) is working on login-local', (done) => {
    chai
      .request(app)
      .post(basePath + '/login-local')
      .send({
        email: data.admin.email,
        password: data.admin.password,
      })
      .end(async (err, res) => {
        should.not.exist(err)
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.token.should.match(/^Bearer/g)
        data.admin.user = res.body
        done()
      })
  })
})
