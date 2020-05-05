'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { create, deleteOne, read, updateOne } = require('./queries')

/**
 * @param {string} userOwnerId Required
 * @param {number} days Required
 * @param {string} langId Required
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
  langId,
  title,
  description = null,
  workouts = [],
  isArchived = false,
  isPrivate = false,
) => {
  if (!userOwnerId) throw new Error('userOwnerId is required')

  if (!ObjectId.isValid(userOwnerId))
    throw new Error('userOwnerId is incorrect')

  if (!langId) throw new Error('langId is required')

  if (!ObjectId.isValid(langId)) throw new Error('langId is incorrect')

  if (!days) throw new Error('title is required')

  // TODO: check is workouts ids are correct

  const newProgram = await create(
    userOwnerId,
    days,
    langId,
    title,
    description,
    workouts,
    isArchived,
    isPrivate,
  )

  return newProgram
}

/**
 * @param {String} id required
 * @return program with id id
 */
const retrieveProgramsByOwnerId = async (id) => {
  if (!id) throw new Error('id is required')

  if (!ObjectId.isValid(id)) throw new Error('id is incorrect')

  const results = await read({ userOwner: id })

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

  return await updateOne(id, data)
}

/**
 * @param {string} id required
 */
const deleteProgram = async (id) => {
  if (!id) throw new Error('Program id is required')

  if (!ObjectId.isValid(id)) throw new Error('Program id is incorrect')

  return await deleteOne(id)
}

module.exports = {
  createProgram,
  retrieveProgramsByOwnerId,
  retrieveProgramById,
  updateProgram,
  deleteProgram,
}
