'use strict'

const coachProfileRouter = require('express').Router()

const {
  createCoachProfile,
  retrieveCoachProfile,
  editCoachProfile,
  removeCoachProfile,
} = require('../../controllers/coach')

coachProfileRouter
  .get('/', retrieveCoachProfile)
  .post('/', createCoachProfile)
  .put('/:coachProfileId', editCoachProfile)
  .delete('/:coachProfileId', removeCoachProfile)

module.exports = coachProfileRouter
