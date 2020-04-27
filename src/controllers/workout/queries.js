'use strict'

const mongoose = require('mongoose')

const Workout = require('../../models/workout')

module.exports = {
   /**
     * @param {string} userOwnerId Required
     * @param {boolean} isArchived 
     * @param {boolean} isPrivate 
     * @param {string} langId Required
     * @param {string} name Required
     * @param {string} instructions Optional
     * @param {Array} exercises Optional
     * @return Created Workout
    */
  createNewWorkout(
    userOwnerId,
    isArchived = false,
    isPrivate = false,
    langId,
    name,
    instructions,
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
          name,
          instructions,
          videoUrl,
        },
      ],
      exercises:exercises,
    })

    return newWorkout.save()
  },

  /**
   * @param {Object} query 
   * @return workout Object
   */
  readWorkout(query = {}) {
      return Workout.find(query);
  },

 /**
   * @param {string} id 
   * @param {Object} data 
   * @return workout Object
   */
  updateWorkoutById(id, data) {
      return Workout.updateOne({_id:id}, data);
  },

  /**
   * 
   * @param {String} id required
   */
  deleteWorkout(id) {
    return Workout.deleteOne({ _id: { $eq: id } })
  }
}