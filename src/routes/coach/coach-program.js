'use strict'

const coachProgramRouter = require('express').Router()

const { requiredAccessToProgram } = require('../../middleware/access-data')
const {
  addProgram,
  retrievePrograms,
  assignTraineesToProgram,
  unassignTraineesFromProgram,
  retrieveProgram,
  editCoachProgram,
  removeCoachProgram,
} = require('../../controllers/coach')

coachProgramRouter
  .get('/', retrievePrograms)
  .post('/', addProgram)
  .get('/:programId', requiredAccessToProgram, retrieveProgram)
  .put('/:programId', requiredAccessToProgram, editCoachProgram)
  .delete('/:programId', requiredAccessToProgram, removeCoachProgram)
  .post('/:programId/assign', requiredAccessToProgram, assignTraineesToProgram)
  .post(
    '/:programId/unassign',
    requiredAccessToProgram,
    unassignTraineesFromProgram,
  )

module.exports = coachProgramRouter
