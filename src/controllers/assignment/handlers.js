'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { create, read, updateOne, del } = require('./queries')

/**
 * @param {string} programId Required
 * @param {array} trainees Required
 * @param {date} startDate Optional
 * @return Created assignments
 */
const createAssignments = async (programId, traineeIds, startDate) => {
  if (!programId) throw new Error('programId is required')

  if (!ObjectId.isValid(programId)) throw new Error('programId is incorrect')

  if (!traineeIds || !traineeIds.length)
    throw new Error('trainee ids are required')

  // Check is all ids are valid
  if (traineeIds.some((id) => !ObjectId.isValid(id)))
    throw new Error('Trainee ids are not valid')

  const newAssignments = await Promise.all(
    traineeIds.map(
      async (id) => await createAssignment(programId, id, startDate),
    ),
  )

  return newAssignments
}

const createAssignment = async (programId, traineeId, startDate) => {
  if (!programId) throw new Error('programId is required')

  if (!ObjectId.isValid(programId)) throw new Error('programId is incorrect')

  if (!traineeId) throw new Error('traineeId is required')

  if (!ObjectId.isValid(traineeId)) throw new Error('traineeId is incorrect')

  const newAssignment = await create(programId, traineeId, startDate)

  return newAssignment
}

const retrieveAssignments = async (assignmentIds) => {
  const assignments = await Promise.all(
    assignmentIds.map(async (id) => await retrieveAssignment(id)),
  )

  return assignments
}

const retrieveAssignment = async (assignmentId) => {
  const assignment = await read({ _id: assignmentId })
    .populate('program')
    .populate('trainee')

  return assignment[0]
}

/**
 *
 * @param {array} assignmentIds
 */
const deleteAssignments = async (assignmentIds) => {
  const results = await Promise.all(
    assignmentIds.map(async (id) => await deleteAssignment(id)),
  )

  return results
}

const deleteAssignment = async (assignmentId) => del(assignmentId)

module.exports = {
  createAssignments,
  deleteAssignments,
  retrieveAssignments,
}
