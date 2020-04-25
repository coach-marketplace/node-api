'use strict'

const coachRouter = require('express').Router()

const { requireJWTAuth, requireAccessMyData } = require('../middleware/auth')

const {
  addCustomerToCoach,
  addExerciseToCoach,
  addServiceToCoach,
  getCoachServices,
  retrieveCoachCustomers,
  retrieveCoachExercises,
} = require('../controllers/coach')

coachRouter
  .get('/:id/services', requireJWTAuth, requireAccessMyData, getCoachServices)
  .post(
    '/:id/services/add',
    requireJWTAuth,
    requireAccessMyData,
    addServiceToCoach,
  )
  .get(
    '/:id/exercises',
    requireJWTAuth,
    requireAccessMyData,
    retrieveCoachExercises,
  )
  .post(
    '/:id/exercises/',
    requireJWTAuth,
    requireAccessMyData,
    addExerciseToCoach,
  )
  .get(
    '/:id/customers',
    requireJWTAuth,
    requireAccessMyData,
    retrieveCoachCustomers,
  )
  .post(
    '/:id/customers',
    requireJWTAuth,
    requireAccessMyData,
    addCustomerToCoach,
  )

module.exports = coachRouter
