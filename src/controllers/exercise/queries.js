'use strict'

const mongoose = require('mongoose')

const Exercise = require('../../models/exercise/index')
const ExerciseContent = require('../../models/exercise/exercise-content')

module.exports = {
  /**
   * @param userOwnerId {string}
   * @param sportId {string}
   * @param isPrivate {string}
   * @return {object} Mongoose query object
   */
  createExercise(userOwnerId, sportId, isPrivate = false) {
    const newExercise = new Exercise({
      _id: new mongoose.Types.ObjectId(),
      userOwner: new mongoose.Types.ObjectId(userOwnerId),
      sport: sportId ? new mongoose.Types.ObjectId(sportId) : null,
      isArchived: false,
      isPrivate: isPrivate,
    })

    return newExercise.save()
  },

  /**
   * @param {string} exerciseId
   * @param {string} langId
   * @param {string} name
   * @param {string} instructions
   * @param {string} videoUrl
   * @return {object} Mongoose query object
   */
  createExerciseContent(exerciseId, langId, name, instructions, videoUrl) {
    const newExerciseContent = new ExerciseContent({
      _id: new mongoose.Types.ObjectId(),
      exercise: new mongoose.Types.ObjectId(exerciseId),
      lang: new mongoose.Types.ObjectId(langId),
      name,
      instructions,
      videoUrl,
    })

    return newExerciseContent.save()
  },

  /**
   * @param {object} query Mongo query object
   * @return {object} Mongoose query object
   */
  readExercise(query = {}) {
    return Exercise.find(query)
  },

  /**
   * @param {object} query Mongo query object
   * @return {object} Mongoose query object
   */
  readExerciseContent(query = {}) {
    return ExerciseContent.find(query)
  },
}
