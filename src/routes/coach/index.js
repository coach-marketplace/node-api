'use strict'

const coachRouter = require('express').Router()

const {
  requireJWTAuth,
  requireAccessMyData,
  // requireAccessMyWorkouts,
} = require('../../middleware/auth')
const {
  hasAccessToExercise,
  hasAccessToWorkout,
} = require('../../middleware/access-data')

const coachCustomerRouter = require('./coach-customer')
const coachProgramRouter = require('./coach-program')
const coachProfileRouter = require('./coach-profile')

const {
  addExerciseToCoach,
  editCoachExercise,
  addServiceToCoach,
  getCoachServices,
  retrieveCoachExercises,
  retrieveCoachExercise,
  searchUserAsCoach,
  deleteCoachExercise,
  addWorkout,
  retrieveWorkouts,
  retrieveWorkout,
  editWorkout,
  removeWorkout,
} = require('../../controllers/coach')

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
    '/:id/exercises/:exerciseId',
    requireJWTAuth,
    requireAccessMyData,
    hasAccessToExercise,
    retrieveCoachExercise,
  )
  .put(
    '/:id/exercises/:exerciseId',
    requireJWTAuth,
    requireAccessMyData,
    hasAccessToExercise,
    editCoachExercise,
  )
  .delete(
    '/:id/exercises/:exerciseId',
    requireJWTAuth,
    requireAccessMyData,
    hasAccessToExercise,
    deleteCoachExercise,
  )
  .get(
    '/:id/search-users',
    requireJWTAuth,
    requireAccessMyData,
    searchUserAsCoach,
  )
  .post('/:id/workouts', requireJWTAuth, requireAccessMyData, addWorkout)
  .get('/:id/workouts', requireJWTAuth, requireAccessMyData, retrieveWorkouts)
  .get(
    '/:id/workouts/:workoutId',
    requireJWTAuth,
    requireAccessMyData,
    hasAccessToWorkout,
    retrieveWorkout,
  )
  .put(
    '/:id/workouts/:workoutId',
    requireJWTAuth,
    requireAccessMyData,
    hasAccessToWorkout,
    editWorkout,
  )
  .delete(
    '/:id/workouts/:workoutId',
    requireJWTAuth,
    requireAccessMyData,
    hasAccessToWorkout,
    removeWorkout,
  )
  .use(
    '/:id/customers',
    requireJWTAuth,
    requireAccessMyData,
    coachCustomerRouter,
  )
  .use('/:id/programs', requireJWTAuth, requireAccessMyData, coachProgramRouter)
  .use('/:id/coach-profile', requireJWTAuth, requireAccessMyData, coachProfileRouter)

module.exports = coachRouter
