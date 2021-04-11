/* eslint-disable no-undef */
'use strict'

const expect = require('chai').expect

const API = require('./utils/api.js')
const Exercise = require('../src/models/exercise')
const MOCK_DATA = require('./utils/mock-data')

before(async () => {
  await Exercise.deleteMany({})
})

describe('02 - Exercise', () => {
  const temporaryData = {}

  it('Should get empty list of exercise', (done) => {
    API.get('/exercises').end((err, res) => {
      if (err) {
        console.log('Error: ', err.message)
      }
      expect(res.status).to.equal(204)
      expect(res.body).to.be.an('object')
      expect(JSON.stringify(res.body)).to.equal('{}')
      done()
    })
  })

  it('Should create an exercise', (done) => {
    API.post('/exercises', MOCK_DATA.exercise).end((err, res) => {
      if (err) {
        console.log('Error: ', err.message)
      }
      expect(res.status).to.equal(201)
      expect(res.body).to.be.an('object')
      expect(res.body._id).to.be.an('string')

      temporaryData.exerciseId = res.body._id
      done()
    })
  })

  it('Should get list with one exercise', (done) => {
    API.get('/exercises').end((err, res) => {
      if (err) {
        console.log('Error: ', err.message)
      }
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(1)
      done()
    })
  })

  it('Should get one exercise', (done) => {
    API.get(`/exercises/${temporaryData.exerciseId}`).end((err, res) => {
      if (err) {
        console.log('Error: ', err.message)
      }
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body._id).to.equal(temporaryData.exerciseId)
      done()
    })
  })

  it('Should update one exercise', (done) => {
    API.put(`/exercises/${temporaryData.exerciseId}`).end((err, res) => {
      if (err) {
        console.log('Error: ', err.message)
      }
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body._id).to.equal(temporaryData.exerciseId)
      done()
    })
  })

  it('Should delete one exercise', (done) => {
    API.delete(`/exercises/${temporaryData.exerciseId}`).end((err, res) => {
      if (err) {
        console.log('Error: ', err.message)
      }
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body.deletedCount).to.equal(1)
      done()
    })
  })

  it('Should delete nothing is id not exist', (done) => {
    API.delete(`/exercises/${MOCK_DATA.fakeId}`).end((err, res) => {
      if (err) {
        console.log('Error: ', err.message)
      }
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body.deletedCount).to.equal(0)
      done()
    })
  })
})

after(async () => {
  await Exercise.deleteMany({})
})
