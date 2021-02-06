'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const Exercise = require('../../models/exercise')
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
exports.createExercise = async (
  userOwnerId,
  lang,
  name,
  sportId,
  instructions,
  videoUrl,
  isPrivate = false,
  isTemplate = false,
) => {
  if (!userOwnerId) throw new Error('userOwnerId is required')

  if (!ObjectId.isValid(userOwnerId))
    throw new Error('userOwnerId is incorrect')

  if (!lang) throw new Error('lang is required')

  if (!LOCALES.includes(lang)) throw new Error('Lang is invalid')

  if (!name) throw new Error('name is required')

  const newExercise = new Exercise({
    _id: new ObjectId(),
    userOwner: new ObjectId(userOwnerId),
    sport: sportId ? new ObjectId(sportId) : null,
    isArchived: false,
    isPrivate,
    isTemplate,
    content: [
      {
        lang,
        name,
        instructions,
        videoUrl,
      },
    ],
  })

  await newExercise.save()

  return newExercise
}

/**
 * @param {string} id Exercise ID
 * @return Sport
 */
exports.getExerciseById = async (id) => {
  if (!id) throw new Error('Id is required')

  if (!ObjectId.isValid(id)) throw new Error('Id is incorrect')

  const exercises = await Exercise.find({ _id: id }).lean()

  if (!exercises.length) return []

  return exercises[0]
}

/**
 * @return List of exercises
 */
exports.getAllExercises = async () => await Exercise.find()

exports.getExercisesByCoachId = async (coachId) => {
  const results = await Exercise.find({ userOwner: coachId })

  return results
}

/**
 * @param {string} exerciseId
 * @param {data} data
 * @return {object} Updated exercise
 */
exports.editExercise = async (exerciseId, data) => {
  const updatedExercise = await Exercise.findOneAndUpdate(
    { _id: exerciseId },
    data,
    {
      new: true,
    },
  )

  return updatedExercise
}

exports.deleteExercise = async (id) => {
  return Exercise.deleteOne({ _id: { $eq: id } })
}
