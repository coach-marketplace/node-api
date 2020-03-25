'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const app = require('../../src/app')

module.exports = {
  getUsers: () => chai.request(app).get('/v1/user'),
  createUser: body =>
    chai
      .request(app)
      .post('/v1/user')
      .send(body),
  updateUser: (id, body) =>
    chai
      .request(app)
      .put(`/v1/user/${id}`)
      .send(body),
  deleteUser: id => chai.request(app).delete(`/v1/user/${id}`),
}
