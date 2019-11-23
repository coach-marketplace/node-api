'use strict'

const request = require('supertest')

const app = require('../../src/app')

module.exports = {
  getUsers: () =>
    request(app)
      .get('/v1/users')
      .send(),
}
