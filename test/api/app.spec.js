/* eslint-disable no-undef */
'use strict'

const chai = require('chai')
const { assert } = chai
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const app = require('../../src/app')

describe('App', () => {
  it('Should ping the app', () =>
    chai
      .request(app)
      .get('/ping')
      .then(res => {
        const result = res.text
        assert(result, 'pong')
      })
      .catch(error => console.log(error)))
})
