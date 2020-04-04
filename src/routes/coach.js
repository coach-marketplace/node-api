'use strict'

const coachRouter = require('express').Router()

const { requireJWTAuth } = require('../middleware/auth')
// const { onlyMe } = require('../middleware/accessRight')
const {
  // retrieveCoaches,
  // addCustomerToCoach,
  // getCoachCustomers,
  // getCoachCustomer,
  addServiceToCoach,
} = require('../controllers/coach')

coachRouter.post('/:id/services/add', requireJWTAuth, addServiceToCoach)
// .get('/', retrieveCoaches)
// .get('/:id/customers', authJWT, onlyMe, getCoachCustomers)
// .post('/:id/customers', authJWT, onlyMe, addCustomerToCoach)
// .get('/:id/customers/:customerId', authJWT, onlyMe, getCoachCustomer)

module.exports = coachRouter
