'use strict'

const coachRouter = require('express').Router()

const { 
  requireJWTAuth, 
  requireAccessMyData,
  requireAccessMyWorkouts,
} = require('../middleware/auth')

const {
  addCustomerToCoach,
  addExerciseToCoach,
  addServiceToCoach,
  getCoachServices,
  retrieveCoachCustomers,
  retrieveCoachExercises,
  searchUserAsCoach,
  addWorkout,
} = require('../controllers/coach')

const {
  AddNewWorkoutToCoach,
  retrieveWorkoutByCoachId,
  retrieveWorkoutById,
  updateWorkout,
  removeWorkout,
} = require('../controllers/workout')

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
  .get(
    '/:id/search-users',
    requireJWTAuth,
    requireAccessMyData,
    searchUserAsCoach,
  )
  .post('/:id/workout', requireJWTAuth, requireAccessMyData, AddNewWorkoutToCoach)
  .get('/:id/workoutByCoach', requireJWTAuth, requireAccessMyData, retrieveWorkoutByCoachId)
  .get('/:id/workout', requireJWTAuth, retrieveWorkoutById)
  .put('/:id/workout', requireJWTAuth, requireAccessMyWorkouts, updateWorkout)
  .delete('/:id/workout', requireJWTAuth, requireAccessMyWorkouts, removeWorkout)


module.exports = coachRouter
