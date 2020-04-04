'use strict'

const coachRouter = require('express').Router()

const { requireJWTAuth, requireAccessMyData } = require('../middleware/auth')
// const { onlyMe } = require('../middleware/accessRight')
const {
  // retrieveCoaches,
  // addCustomerToCoach,
  // getCoachCustomers,
  // getCoachCustomer,
  getCoachServices,
  addServiceToCoach,
} = require('../controllers/coach')

coachRouter
  .get('/:id/services', requireJWTAuth, requireAccessMyData, getCoachServices)
  .post(
    '/:id/services/add',
    requireJWTAuth,
    requireAccessMyData,
    addServiceToCoach,
  )
// .get('/', retrieveCoaches)
// .get('/:id/customers', authJWT, onlyMe, getCoachCustomers)
// .post('/:id/customers', authJWT, onlyMe, addCustomerToCoach)
// .get('/:id/customers/:customerId', authJWT, onlyMe, getCoachCustomer)

module.exports = coachRouter
