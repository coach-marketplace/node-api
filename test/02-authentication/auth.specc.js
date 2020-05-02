/* eslint-disable no-undef */
'use strict'

const chai = require('chai')
const { expect } = chai
const should = chai.should()

const Http = require('../_utils/Http')
const {
  connectToDatabase,
  disconnectToDatabase,
} = require('../_utils/database')
const { USER } = require('../_utils/mockData')

describe('Authentication', () => {
  before((done) => {
    connectToDatabase(async () => done())
  })

  after(async (done) => {
    disconnectToDatabase(done)
  })

  it('Should register a new user', (done) => {
    Http.post('auth/register-local', USER.john).end((err, res) => {
      should.not.exist(err)
      res.should.have.status(201)
      res.body.should.be.a('object')
      res.body.email.should.equal(USER.john.email)
      done()
    })
  })

  it('Should not be able to register with an existing email', (done) => {
    Http.post('auth/register-local', USER.john).end((err, res) => {
      should.not.exist(err)
      res.should.have.status(500)
      res.body.should.be.a('object')
      res.body.debug_message.should.be.equal('Email already used')
      done()
    })
  })

  it('Should login with the new user', (done) => {
    Http.post('auth/login-local', {
      email: USER.john.email,
      password: USER.john.password,
    }).end((err, res) => {
      should.not.exist(err)
      res.should.have.status(201)
      res.body.should.be.a('object')
      res.body.user.should.not.be.empty
      expect(res.body).to.have.property('user')
      expect(res.body).to.have.property('token')
      done()
    })
  })

  it('Should not be able to login with wrong password', (done) => {
    Http.post('auth/login-local', {
      email: USER.john.email,
      password: 'wrong-password',
    }).end((err, res) => {
      should.not.exist(err)
      res.should.have.status(401)
      res.body.should.be.a('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Email or password incorrect')
      done()
    })
  })
})

// TODO: Logout
// TODO: Handle the error login with something else than an error 500
