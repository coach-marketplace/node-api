'use strict'

const mongoose = require('mongoose')

const Exercise = require('../../models/exercise/index')

module.exports = {
  /**
   * @param {string} userOwnerId
   * @param {string} sportId
   * @param {string} langId
   * @param {string} name
   * @param {string} instructions
   * @param {string} videoUrl
   * @param {string} isPrivate
   * @return {object} Mongoose query object
   */
  createExercise(
    userOwnerId,
    sportId,
    langId,
    name,
    instructions,
    videoUrl,
    isPrivate = false,
  ) {
    const newExercise = new Exercise({
      _id: new mongoose.Types.ObjectId(),
      userOwner: new mongoose.Types.ObjectId(userOwnerId),
      sport: sportId ? new mongoose.Types.ObjectId(sportId) : null,
      isArchived: false,
      isPrivate: isPrivate,
      content: [
        {
          lang: new mongoose.Types.ObjectId(langId),
          name,
          instructions,
          videoUrl,
        },
      ],
    })

    return newExercise.save()
  },

  /**
   * @param {object} query Mongo query object
   * @return {object} Mongoose query object
   */
  readExercise(query = {}) {
    return Exercise.find(query)
  },
}
