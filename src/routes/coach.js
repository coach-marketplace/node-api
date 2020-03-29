'use strict'

const coachRouter = require('express').Router()

const { authJWT } = require('../middleware/auth')
const { onlyMe } = require('../middleware/accessRight')
const {
  retrieveCoaches,
  addCustomerToCoach,
  getCoachCustomers,
  getCoachCustomer,
} = require('../controllers/coach')

coachRouter
// .get('/', retrieveCoaches)
// .get('/:id/customers', authJWT, onlyMe, getCoachCustomers)
// .post('/:id/customers', authJWT, onlyMe, addCustomerToCoach)
// .get('/:id/customers/:customerId', authJWT, onlyMe, getCoachCustomer)

module.exports = coachRouter
