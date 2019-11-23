/* eslint-disable no-undef */
'use strict'

const chai = require('chai')
const { assert } = chai
const request = require('supertest')

const app = require('../../src/app')

describe('App', () => {
  it('Ping the app', () => {
    request(app)
      .get('/ping')
      .send()
      .then(res => {
        const result = res.text
        assert(result, 'pong')
      })
      .catch(error => console.log(error))
  })
})
