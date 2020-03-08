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

module.exports = serviceRouter
