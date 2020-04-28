'use strict'

const mongoose = require('mongoose')

const Workout = require('../../models/workout')

module.exports = {
  /**
   * @param {string} userOwnerId Required
   * @param {string} langId Required
   * @param {string} title Required
   * @param {string} content Optional
   * @param {boolean} isArchived
   * @param {boolean} isPrivate
   * @return Created Workout
   */
  createNewWorkout(
    userOwnerId,
    langId,
    title,
    content,
    isArchived = false,
    isPrivate = false,
    exercises
  ) {
    const newWorkout = new Workout({
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
      exercises: exercises,
    })

    return newWorkout.save()
  },

  /**
   * @param {Object} query
   * @return workout Object
   */
  readWorkout(query = {}) {
    return Workout.find(query)
  },

  /**
   * @param {string} id
   * @param {Object} data
   * @return workout Object
   */
  updateWorkoutById(id, data) {
    return Workout.updateOne({ _id: id }, data)
  },

  /**
   *
   * @param {String} id required
   */
  deleteWorkout(id) {
    return Workout.deleteOne({ _id: { $eq: id } })
  },
}
