'use strict'

const exerciseRouter = require('express').Router()

const exerciseController = require('../controllers/exercise')

// TODO: protect those route only for admin
exerciseRouter
  .get('/', exerciseController.getAll)
  .post('/', exerciseController.create)
  .get('/:id', exerciseController.getById)
  .put('/:id', exerciseController.updateOne)
  .delete('/:id', exerciseController.removeOne)

module.exports = exerciseRouter
