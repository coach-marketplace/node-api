'use strict'

const exerciseRouter = require('express').Router()

const {
  createExercise,
  retrieveExercise,
  retrieveExercises,
} = require('../controllers/exercise')

exerciseRouter
  .get('/', retrieveExercises)
  .post('/', createExercise)
  .get('/:id', retrieveExercise)

module.exports = exerciseRouter
