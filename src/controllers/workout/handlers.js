'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const {
  createNewWorkout,
  deleteWorkout,
  readWorkout,
  updateWorkoutById,
} = require('./queries')

module.exports = {
  /**
   * @param {string} userOwnerId Required
   * @param {string} langId Required
   * @param {string} title Required
   * @param {string} content Optional
   * @param {Array} exercises Optional
   * @param {boolean} isArchived Default: false
   * @param {boolean} isPrivate Default: false
   * @return Created Workout
   */
  createWorkout: async (
    userOwnerId,
    langId,
    title,
    content = null,
    isArchived = false,
    isPrivate = false,
  ) => {
    if (!userOwnerId) throw new Error('userOwnerId is required')

    if (!ObjectId.isValid(userOwnerId))
      throw new Error('userOwnerId is incorrect')

    if (!langId) throw new Error('langId is required')

    if (!ObjectId.isValid(langId)) throw new Error('langId is incorrect')

    if (!title) throw new Error('title is required')

    const newWorkout = await createNewWorkout(
      userOwnerId,
      langId.toString(),
      title,
      content,
      isArchived,
      isPrivate,
    )

    return newWorkout
  },

  /**
   * @return list of workouts
   */
  retrieveWorkouts: async () => {
    return await readWorkout()
  },

  /**
   * @param {String} id required
   * @return exercise with id id
   */
  retrieveWorkoutByCoachId: async (id) => {
    if (!id) throw new Error('id is required')

    if (!ObjectId.isValid(id)) throw new Error('id is incorrect')

    return await readWorkout({ owner: id })
  },

  /**
   * @param {String} id required
   * @param {Object} workoutData required
   * @return updated workout
   */
  updateWorkout: async (id, workoutData) => {
    if (!id) throw new Error('workout id is required')

    if (!ObjectId.isValid(id)) throw new Error('workout id is incorrect')

    return await updateWorkoutById(id, workoutData)
  },

  /**
   * @param {string} id required
   */
  removeWorkout: async (id) => {
    if (!id) throw new Error('WOrkout id is required')

    if (!ObjectId.isValid(id)) throw new Error('workout id is incorrect')

    return await deleteWorkout(id)
  },
}
