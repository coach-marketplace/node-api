/* eslint-disable no-undef */
let chai = require('chai')

let chaiHttp = require('chai-http')

// eslint-disable-next-line no-unused-vars
let server = require('../../src/server.js')

const { editUser } = require('../../src/controllers/user/handlers')

let should = chai.should()

chai.use(chaiHttp)

var data = require('./shared.js')

const application = require('../../src/app')

const { PORT } = process.env
let app = 'http://localhost:' + PORT

let basePath = '/v1/auth'

describe('Testing auth', () => {
  describe('test auth/register-local', () => {
    /**
     * Test creating new user
     */
    describe('Test creating new user (customer) ', () => {
      it('Creating new user (customer) ', (done) => {
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
    })

    /**
     * Test creating new Admin
     */
    describe('Test creating new user (admin) ', () => {
      it('Creating new user (admin) && update isAdmin => true ', (done) => {
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
    })

    /**
     * Test creating new Coach
     */
    describe('Test creating new user (coach) ', () => {
      it('Creating new user (coach) && update isCoach => true ', (done) => {
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
  })

  describe('test auth/login-local', () => {
    /**
     * Test login user (customer)
     */
    describe('Test login user (customer) ', () => {
      it('login user (customer) ', (done) => {
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
            res.body.token.should.not.equal(``)
            data.coach.user = res.body
            done()
          })
      })
    })
  })
})
