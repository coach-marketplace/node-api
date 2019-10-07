'use strict'

const chai = require('chai')
const { assert, expect } = chai
const request = require('supertest')

const app = require('../../src/app')
const database = require('../../src/database')

describe('App', () => {

  before(done => {
    done()
    // database.connect()
    //   .then(() => done())
    //   .catch(error => done(error))
  })

  after(done => {
    database.close()
    .then(() => process.exit())
    .then(() => done())
    .catch(error => done(error))
  })

  it('Ping the app', () => {
    request(app)
      .get('/ping')
      .send()
      .then(res => {
        // console.log('+', res.text)
        const result = res.text
        // assert(result, "pong")
        expect(res.text).to.be("ping")
        // assert('a').equal('a')
      })
  })

})
