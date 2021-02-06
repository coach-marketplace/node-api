'use strict'

const exerciseRouter = require('express').Router()

const exerciseController = require('../controllers/exercise')

// TODO: protect those route only for admin
exerciseRouter
  .get('/', exerciseController.getAll)
  .post('/', exerciseController.create)
  .get('/:id', exerciseController.getById)

module.exports = exerciseRouter
