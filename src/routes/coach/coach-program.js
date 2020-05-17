'use strict'

const coachRouter = require('express').Router()

const { requiredAccessToProgram } = require('../../middleware/access-data')
const {
  addProgram,
  retrievePrograms,
  assignTraineesToProgram,
  unassignTraineesToProgram,
  retrieveProgram,
  editCoachProgram,
  removeCoachProgram,
} = require('../../controllers/coach')

coachRouter
  .get('/', retrievePrograms)
  .post('/', addProgram)
  .get('/:programId', requiredAccessToProgram, retrieveProgram)
  .put('/:programId', requiredAccessToProgram, editCoachProgram)
  .delete('/:programId', requiredAccessToProgram, removeCoachProgram)
  .post('/:programId/assign', requiredAccessToProgram, assignTraineesToProgram)
  .post(
    '/:programId/unassign',
    requiredAccessToProgram,
    unassignTraineesToProgram,
  )

module.exports = coachRouter
