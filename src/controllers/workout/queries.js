'use strict'

const mongoose = require('mongoose')

const Workout = require('../../models/workout')

module.exports = {
  /**
   * @param {string} userOwnerId Required
   * @param {string} lang Required
   * @param {string} title Required
   * @param {string} instructions Optional
   * @param {array} exercises Optional - Arrays of exercises
   * @param {boolean} isArchived
   * @param {boolean} isPrivate
   * @return Created Workout
   */
  create(
    userOwnerId,
    lang,
    title,
    instructions,
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
          lang,
          title,
          instructions,
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
   * @param {object} query Match query
   * @param {object} data Data to update
   * @param {object} options Mongo options object
   * @return {object} Mongoose query object
   */
  updateOne(query = {}, data = {}, options = {}) {
    return Workout.findOneAndUpdate(query, data, options)
  },

  /**
   *
   * @param {String} id required
   */
  deleteOne(id) {
    return Workout.deleteOne({ _id: { $eq: id } })
  },
}
