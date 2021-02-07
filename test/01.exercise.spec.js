/* eslint-disable no-undef */
'use strict'

const expect = require('chai').expect

const API = require('./utils/api.js')
const { LOCALE } = require('../src/_utils/constants')
const Exercise = require('../src/models/exercise')

const MOCK_DATA = {
  exercise: {
    isArchived: false,
    isPrivate: true,
    isTemplate: true,
    content: [
      {
        lang: LOCALE.EN_US,
        name: 'Burpee',
        instructions: 'Lie on the floor, then get up and jump.',
        sport: 'CrossFit',
      },
      {
        lang: LOCALE.FR_FR,
        name: 'Burpee',
        instructions: 'Couche toi au sol, ensuite relève toi et saute.',
        sport: 'CrossFit',
      },
    ],
  },
}

before(async () => {
  await Exercise.deleteMany({})
})

describe('Exercise', () => {
  it('Should get all exercises', (done) => {
    API.get('/v1/exercises').end((err, res) => {
      if (err) {
        console.log('Error: ', err.message)
      } else {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('array')
      }
      done()
    })
  })

  it('Should create an exercise', (done) => {
    API.post('/v1/exercises', {
      instructions: MOCK_DATA.exercise.content[0].instructions,
      isPrivate: false,
      isTemplate: true,
      lang: MOCK_DATA.exercise.content[0].lang,
      name: MOCK_DATA.exercise.content[0].name,
      sport: MOCK_DATA.exercise.content[0].sport,
    }).end((err, res) => {
      if (err) {
        console.log('Error: ', err.message)
      } else {
        expect(res.status).to.equal(201)
        expect(res.body).to.be.an('object')
        expect(res.body.isArchived).to.equal(false)
      }
      done()
    })
  })
})

after(async () => {
  await Exercise.deleteMany({})
})
