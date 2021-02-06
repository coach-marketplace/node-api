/**
 * HTTP
 *
 * Class to handle http request for testing
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should()

const app = require('../src/app')

chai.use(chaiHttp)

// TODO: fix set token to continue testing
class HTTP {
  static init() {
    this.client = chai
    this.baseUrl = `/v1/`
    this.token = null
    // this.clientWithAuthorization = function() {
    //   if (this.token) {
    //     console.log('CLIENT', this.client)
    //     return this.client.set('authorization', this.token)
    //   }
    //   return this.client
    // }
  }

  static getClient() {
    if (this.token) {
      return this.client.request(app).set('authorization', this.token)
    }
    return this.client.request(app)
  }

  static setToken(token) {
    this.token = token
  }

  static ping() {
    return this.getClient().get(`/ping`)
  }

  static get(endPoint) {
    return this.getClient().get(`${this.baseUrl}${endPoint}`)
  }

  static post(endPoint, body) {
    // return this.clientWithAuthorization()
    return this.getClient().post(`${this.baseUrl}${endPoint}`).send(body)
  }

  static put(endPoint, body) {
    return this.getClient().put(`${this.baseUrl}${endPoint}`).send(body)
  }

  static delete(endPoint) {
    return this.getClient().delete(`${this.baseUrl}${endPoint}`)
  }
}

HTTP.init()

module.exports = HTTP
