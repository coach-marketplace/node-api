'use strict'

const coachCustomerRouter = require('express').Router()

const { requiredAccessToCustomer } = require('../../middleware/access-data')
const {
  addCustomerToCoach,
  retrieveCoachCustomers,
  retrieveCoachCustomer,
} = require('../../controllers/coach')

coachCustomerRouter
  .get('/', retrieveCoachCustomers)
  .post('/', addCustomerToCoach)
  .get('/:customerId', requiredAccessToCustomer, retrieveCoachCustomer)

module.exports = coachCustomerRouter
