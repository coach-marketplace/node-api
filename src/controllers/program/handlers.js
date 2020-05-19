'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { create, deleteOne, read, updateOne } = require('./queries')
const { LOCALES } = require('../../_utils/constants')

/**
 * @param {string} userOwnerId Required
 * @param {number} days Required
 * @param {string} lang Required
 * @param {string} title Required
 * @param {string} description Optional
 * @param {Array} workouts Optional
 * @param {boolean} isArchived Default: false
 * @param {boolean} isPrivate Default: false
 * @return Created Program
 */
const createProgram = async (
  userOwnerId,
  days,
  lang,
  title,
  description = null,
  workouts = [],
  isArchived = false,
  isPrivate = false,
) => {
  if (!userOwnerId) throw new Error('userOwnerId is required')

  if (!ObjectId.isValid(userOwnerId))
    throw new Error('userOwnerId is incorrect')

  if (!lang) throw new Error('langId is required')

  if (!LOCALES.includes(lang)) throw new Error('Lang is invalid')

  if (!days) throw new Error('title is required')

  // TODO: check is workouts ids are correct

  const newProgram = await create(
    userOwnerId,
    days,
    lang,
    title,
    description,
    workouts,
    isArchived,
    isPrivate,
  )

  return newProgram
}

/**
 * @param {String} ownerId required
 * @return program with id id
 */
const retrieveProgramsByOwnerId = async (ownerId) => {
  if (!ownerId) throw new Error('ownerId is required')

  if (!ObjectId.isValid(ownerId)) throw new Error('ownerId is incorrect')

  const results = await read({ userOwner: ownerId })

  return results
}

/**
 * @param {String} id required
 * @return program
 */
const retrieveProgramById = async (id) => {
  if (!id) throw new Error('id is required')

  if (!ObjectId.isValid(id)) throw new Error('id is incorrect')

  const results = await read({ _id: id })

  return results[0]
}

/**
 * @param {String} id required
 * @param {Object} data required
 * @return updated program
 */
const updateProgram = async (id, data) => {
  if (!id) throw new Error('Program id is required')

  if (!ObjectId.isValid(id)) throw new Error('Program id is incorrect')

  return await updateOne({ _id: id }, data, { new: true })
}

/**
 * @param {string} id required
 */
const deleteProgram = async (id) => {
  if (!id) throw new Error('Program id is required')

  if (!ObjectId.isValid(id)) throw new Error('Program id is incorrect')

  return await deleteOne(id)
}

/**
 * @param {object} program required
 * @param {array} trainees Trainees to add required
 */
const addTraineesToProgram = async (program, trainees) => {
  if (!program) throw new Error('Program is required')
  if (!trainees || !trainees.length) throw new Error('Trainees are required')

  let hasError = false

  trainees.forEach(async (traineeId) => {
    if (!program.trainees.includes(traineeId)) {
      program.trainees.push(traineeId)
    } else {
      hasError = true
    }
  })

  if (hasError) throw new Error('One of id already assigned')

  const updatedProgram = await updateOne({ _id: program._id }, program, {
    new: true,
  })

  return updatedProgram
}

/**
 * @param {object} program required
 * @param {array} trainees Trainees to add required
 */
const removeTraineesFromProgram = async (program, trainees) => {
  if (!program) throw new Error('Program is required')
  if (!trainees || !trainees.length) throw new Error('Trainees are required')

  trainees.forEach(async (traineeId) => {
    const traineeIndex = program.trainees.findIndex(
      (id) => id.toString() === traineeId,
    )
    if (traineeIndex === -1) return

    program.trainees.splice(traineeIndex, 1)
  })

  return await updateOne({ _id: program._id }, program, { new: true })
}

module.exports = {
  createProgram,
  retrieveProgramsByOwnerId,
  retrieveProgramById,
  updateProgram,
  deleteProgram,
  addTraineesToProgram,
  removeTraineesFromProgram,
}
