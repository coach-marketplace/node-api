/**
 * HTTP
 *
 * Class to handle http request for testing
 */

const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../../src/app')

chai.use(chaiHttp)

// TODO: fix set token to continue testing
class HTTP {
  static init() {
    this.client = chai
    this.baseUrl = `/v1/`
    this.token = null
    this.clientWithAuthorization = function() {
      if (this.token) {
        console.log('CLIENT', this.client)
        return this.client.set('authorization', this.token)
      }
      return this.client
    }
  }

  static setToken(token) {
    this.token = token
  }

  static ping() {
    return this.client.request(app).get(`ping`)
  }

  static get(endPoint) {
    return this.clientWithAuthorization()
      .request(app)
      .get(`${this.baseUrl}${endPoint}`)
  }

  static post(endPoint, body) {
    return this.clientWithAuthorization()
      .request(app)
      .post(`${this.baseUrl}${endPoint}`)
      .send(body)
  }

  static put(endPoint, body) {
    return this.clientWithAuthorization()
      .put(`${this.baseUrl}${endPoint}`)
      .send(body)
  }

  static delete(endPoint) {
    return this.clientWithAuthorization().delete(`${this.baseUrl}${endPoint}`)
  }
}

HTTP.init()

module.exports = HTTP
