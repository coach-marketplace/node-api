/**
 * HTTP
 *
 * Class to handle http request for testing
 */

const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../../src/app')

chai.use(chaiHttp)

class HTTP {
  static init() {
    this.baseUrl = `/v1/`
  }

  static ping() {
    return chai.request(app).get(`ping`)
  }

  static get(endPoint) {
    return chai.request(app).get(`${this.baseUrl}${endPoint}`)
  }

  static post(endPoint, body) {
    return chai
      .request(app)
      .post(`${this.baseUrl}${endPoint}`)
      .send(body)
  }

  static put(endPoint, body) {
    return chai
      .request(app)
      .put(`${this.baseUrl}${endPoint}`)
      .send(body)
  }

  static delete(endPoint) {
    return chai.request(app).delete(`${this.baseUrl}${endPoint}`)
  }
}

HTTP.init()

module.exports = HTTP
