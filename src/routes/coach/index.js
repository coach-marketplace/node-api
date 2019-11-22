'use strict'

const coachRouter = require('express').Router()

const {
  readCoaches,
  createCoach,
  readCoach,
  updateCoach,
  deleteCoach,
} = require('../../controllers/coach/index.js')

coachRouter
  .get('/', readCoaches)
  .post('/', createCoach)
  .get('/:id', readCoach)
  .put('/:id', updateCoach)
  .delete('/:id', deleteCoach)

module.exports = coachRouter
