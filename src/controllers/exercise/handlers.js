'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { create, read, updateByLang } = require('./queries')
const { LOCALES } = require('../../_utils/constants')

/**
 * @param {string} userOwnerId Required
 * @param {string} lang Required
 * @param {string} name Required
 * @param {string} sportId Optional
 * @param {string} instructions Optional
 * @param {string} videoUrl Optional
 * @param {boolean} isPrivate Default: false
 * @return Created sport
 */
const createExercise = async (
  userOwnerId,
  lang,
  name,
  sportId,
  instructions,
  videoUrl,
  isPrivate = false,
) => {
  if (!userOwnerId) throw new Error('userOwnerId is required')

  if (!ObjectId.isValid(userOwnerId))
    throw new Error('userOwnerId is incorrect')

  if (!lang) throw new Error('lang is required')

  if (!LOCALES.includes(lang)) throw new Error('Lang is invalid')

  if (!name) throw new Error('name is required')

  const newExercise = await create(
    userOwnerId,
    sportId,
    lang,
    name,
    instructions,
    videoUrl,
    isPrivate,
  )

  return newExercise
}

/**
 * @param {string} id Exercise ID
 * @return Sport
 */
const getExerciseById = async (id) => {
  if (!id) throw new Error('Id is required')

  if (!ObjectId.isValid(id)) throw new Error('Id is incorrect')

  const exercises = await read({ _id: id }).lean()

  if (!exercises.length) return []

  return exercises[0]
}

/**
 * @return List of exercises
 */
const getAllExercises = async () => await read()

const getExercisesByCoachId = async (coachId) => {
  const results = await read({ userOwner: coachId })

  return results
}

/**
 * @param {string} exerciseId
 * @param {data} data
 * @return {object} Updated exercise
 */
const editExercise = async (exerciseId, data) => {
  const dataToUpdate = {}
  data.sport && (dataToUpdate.sport = data.sport)
  data.isArchived && (dataToUpdate.isArchived = data.isArchived)
  data.isPrivate && (dataToUpdate.isPrivate = data.isPrivate)

  if (data.lang && !LOCALES.includes(data.lang))
    throw new Error('Lang in invalid')

  data.name && (dataToUpdate['content.$.name'] = data.name)
  data.instructions &&
    (dataToUpdate['content.$.instructions'] = data.instructions)
  data.videoUrl && (dataToUpdate['content.$.videoUrl'] = data.videoUrl)
  console.debug(dataToUpdate)

  const updatedExercise = await updateByLang(exerciseId, data.lang, {
    $set: dataToUpdate,
  })

  return updatedExercise
}

module.exports = {
  createExercise,
  getExerciseById,
  getAllExercises,
  getExercisesByCoachId,
  editExercise,
}
