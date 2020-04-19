'use strict'

const coachRouter = require('express').Router()

const { requireJWTAuth, requireAccessMyData } = require('../middleware/auth')

const {
  addCustomerToCoach,
  addExerciseToCoach,
  addServiceToCoach,
  getCoachServices,
  retrieveCoachConversations,
  retrieveCoachCustomers,
  retrieveCoachExercises,
  startConversation,
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
    '/:id/exercises/add',
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
  .get(
    '/:id/conversations',
    requireJWTAuth,
    requireAccessMyData,
    retrieveCoachConversations,
  )
  .post(
    '/:id/conversations',
    requireJWTAuth,
    requireAccessMyData,
    startConversation,
  )

module.exports = coachRouter
