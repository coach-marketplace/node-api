'use strict'

const mongoose = require('mongoose')

const Workout = require('../../models/workout')

module.exports = {
  /**
   * @param {string} userOwnerId Required
   * @param {string} langId Required
   * @param {string} title Required
   * @param {string} content Optional
   * @param {array} exercises Optional - Arrays of exercises
   * @param {boolean} isArchived
   * @param {boolean} isPrivate
   * @return Created Workout
   */
  create(
    userOwnerId,
    langId,
    title,
    content,
    exercises = null,
    isArchived = false,
    isPrivate = false,
  ) {
    const newWorkoutData = {
      _id: new mongoose.Types.ObjectId(),
      userOwner: new mongoose.Types.ObjectId(userOwnerId),
      isArchived: isArchived,
      isPrivate: isPrivate,
      content: [
        {
          lang: new mongoose.Types.ObjectId(langId),
          title,
          content,
        },
      ],
    }
    exercises && (newWorkoutData.exercises = exercises)
    const newWorkout = new Workout(newWorkoutData)

    return newWorkout.save()
  },

  /**
   * @param {Object} query
   * @return workout Object
   */
  read(query = {}) {
    return Workout.find(query)
  },

  /**
   * @param {string} id
   * @param {Object} data
   * @return workout Object
   */
  updateOne(id, data) {
    return Workout.updateOne({ _id: id }, data)
  },

  /**
   *
   * @param {String} id required
   */
  deleteOne(id) {
    return Workout.deleteOne({ _id: { $eq: id } })
  },
}
