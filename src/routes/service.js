'use strict'

const serviceRouter = require('express').Router()

const {
  createService,
  readServices,
  getServiceById,
} = require('../controllers/service')

serviceRouter
  .get('/', readServices)
  .post('/', createService)
  .get('/:id', getServiceById)
  .post('/search', getServiceById) // TODO: use the right controller

module.exports = serviceRouter
