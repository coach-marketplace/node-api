/* eslint-disable no-undef */
'use strict'

const expect = require('chai').expect

const Http = require('./Http.js')

describe('Exercise', () => {
  it('Should get all exercises', (done) => {
    Http.ping()
      .then((res) => {
        expect(res.text).to.equal('pong')
        done()
      })
      .catch(done)
  })
})
