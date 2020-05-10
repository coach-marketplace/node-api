'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { create, deleteOne, read, updateOne } = require('./queries')
const { LOCALES } = require('../../_utils/constants')

/**
 * @param {string} userOwnerId Required
 * @param {string} lang Required
 * @param {string} title Required
 * @param {string} instructions Optional
 * @param {Array} exercises Optional
 * @param {boolean} isArchived Default: false
 * @param {boolean} isPrivate Default: false
 * @return Created Workout
 */
const createWorkout = async (
  userOwnerId,
  lang,
  title,
  instructions = null,
  exercises = [],
  isArchived = false,
  isPrivate = false,
) => {
  if (!userOwnerId) throw new Error('userOwnerId is required')

  if (!ObjectId.isValid(userOwnerId))
    throw new Error('userOwnerId is incorrect')

  if (!lang) throw new Error('lang is required')

  if (!LOCALES.includes(lang)) throw new Error('lang is invalid')

  if (!title) throw new Error('title is required')

  // TODO: check is exercises ids are correct

  const newWorkout = await create(
    userOwnerId,
    lang,
    title,
    instructions,
    exercises,
    isArchived,
    isPrivate,
  )

  return newWorkout
}

/**
 * @param {String} id required
 * @return exercise with id id
 */
const retrieveWorkoutsByOwnerId = async (id) => {
  if (!id) throw new Error('id is required')

  if (!ObjectId.isValid(id)) throw new Error('id is incorrect')

  const results = await read({ userOwner: id })

  return results
}

/**
 * @param {String} id required
 * @return exercise with id id
 */
const retrieveWorkoutById = async (id) => {
  if (!id) throw new Error('id is required')

  if (!ObjectId.isValid(id)) throw new Error('id is incorrect')

  const results = await read({ _id: id })

  return results[0]
}

/**
 * @param {String} id required
 * @param {Object} data required
 * @return updated workout
 */
const updateWorkout = async (id, data) => {
  if (!id) throw new Error('workout id is required')

  if (!ObjectId.isValid(id)) throw new Error('workout id is incorrect')

  const updatedWorkout = await updateOne({ _id: id }, data, { new: true })

  return updatedWorkout
}

/**
 * @param {string} id required
 */
const deleteWorkout = async (id) => {
  if (!id) throw new Error('Workout id is required')

  if (!ObjectId.isValid(id)) throw new Error('workout id is incorrect')

  return await deleteOne(id)
}

module.exports = {
  createWorkout,
  retrieveWorkoutsByOwnerId,
  retrieveWorkoutById,
  updateWorkout,
  deleteWorkout,
}
