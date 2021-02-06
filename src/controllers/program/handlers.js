'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const Program = require('../../models/program')
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

  const newProgramData = {
    _id: new ObjectId(),
    userOwner: new ObjectId(userOwnerId),
    isArchived: isArchived,
    isPrivate: isPrivate,
    days: days,
    content: [
      {
        lang,
        title,
        description,
      },
    ],
  }
  workouts && (newProgramData.workouts = workouts)
  const newProgram = new Program(newProgramData)

  return newProgram.save()
}

/**
 * @param {String} ownerId required
 * @return program with id id
 */
const retrieveProgramsByOwnerId = async (ownerId) => {
  if (!ownerId) throw new Error('ownerId is required')

  if (!ObjectId.isValid(ownerId)) throw new Error('ownerId is incorrect')

  const results = await Program.find({ userOwner: ownerId })

  return results
}

/**
 * @param {String} id required
 * @return program
 */
const retrieveProgramById = async (id) => {
  if (!id) throw new Error('id is required')

  if (!ObjectId.isValid(id)) throw new Error('id is incorrect')

  const results = await Program.find({ _id: id })

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

  return await Program.findOneAndUpdate({ _id: id }, data, { new: true })
}

/**
 * @param {string} id required
 */
const deleteProgram = async (id) => {
  if (!id) throw new Error('Program id is required')

  if (!ObjectId.isValid(id)) throw new Error('Program id is incorrect')

  return await Program.deleteOne({ _id: { $eq: id } })
}

module.exports = {
  createProgram,
  retrieveProgramsByOwnerId,
  retrieveProgramById,
  updateProgram,
  deleteProgram,
}
