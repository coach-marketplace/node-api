'use strict'

const workoutRouter = require('express').Router()

const workoutController = require('../controllers/workout')

// TODO: protect those route only for admin
workoutRouter
  .get('/', workoutController.getAll)
  .post('/', workoutController.create)
  .get('/:id', workoutController.getById)

module.exports = workoutRouter
