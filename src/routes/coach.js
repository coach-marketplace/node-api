'use strict'

const coachRouter = require('express').Router()

const { retrieveCoaches, addCustomerToCoach } = require('../controllers/coach')

coachRouter
  .get('/', retrieveCoaches)
  .post('/:id/add-customer', addCustomerToCoach)

module.exports = coachRouter
