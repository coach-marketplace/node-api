/* eslint-disable no-undef */
'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should()

const app = require('../src/app')

chai.use(chaiHttp)

const expect = require('chai').expect

// const API = require('./utils/api.js')

describe('Exercise', () => {
  it('Should get all exercises', (done) => {
    chai
      .request(app)
      .get('/v1/exercises')
      .end((err, res) => {
        const result = res.statusCode
        expect(result).to.equal(200)
        done()
      })
    // try {
    //   console.log('okay...')
    //   const a = await chai.request(app).get('/v1/exercises')
    //   console.log('era', a)
    //   done()
    // } catch (e) {
    //   console.log('err', e.message)
    //   done()
    // }
    // .then((err, res) => {
    //   console.log('ERR: ', err)
    //   console.log('END: ', res)
    //   // expect(res.text).to.equal('pong')
    //   // done()
    // })
    // .catch(done)
  })
})
