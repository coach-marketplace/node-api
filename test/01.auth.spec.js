/* eslint-disable no-undef */
const { createUser, editUser } = require('../src/controllers/user/handlers')

process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')

// eslint-disable-next-line no-unused-vars
let server = require('../src/server.js')

let should = chai.should()

chai.use(chaiHttp)

var data = require('./shared.js')

const application = require('../src/app')

const { PORT } = process.env
let app = 'http://localhost:' + PORT

let basePath = '/v1/auth'

before((done) => {
  application.on('appStarted', async () => {
    data.admin.user = await createUser(
      data.admin.email,
      data.admin.firstName,
      data.admin.lastName,
      data.admin.phone,
      data.admin.password,
      true,
    )
    data.admin.user = await editUser(data.admin.user._id, { isAdmin: true })
    done()
  })
})

//Create a user
describe('Ensure new user is working', () => {
  it('Create a new user (coach)', (done) => {
    chai
      .request(app)
      .post(basePath + '/register-local')
      .send(data.coach)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.email.should.equal(data.coach.email)
        data.coach.user = res.body
        done()
      })
  })

  it('log in with new user (coach)', (done) => {
    chai
      .request(app)
      .post(basePath + '/login-local')
      .send({ email: data.coach.email, password: data.coach.password })
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.user.should.not.be.empty
        data.coach.token = res.body.token
        done()
      })
  })

  it('log in with new user (admin)', (done) => {
    chai
      .request(app)
      .post(basePath + '/login-local')
      .send({ email: data.admin.email, password: data.admin.password })
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.user.should.not.be.empty
        data.admin.token = res.body.token
        done()
      })
  })
})

//TODO logout
