/* eslint-disable no-undef */
'use strict'

const expect = require('chai').expect

const API = require('./utils/api.js')

describe('00 - Ping the app', () => {
  it('Should receive pong after ping', (done) => {
    API.ping()
      .then((res) => {
        expect(res.text).to.equal('pong')
        done()
      })
      .catch(done)
  })
})
