'use strict'

const mongoose = require('mongoose')

const Exercise = require('../../models/exercise')

module.exports = {
  /**
   * @param {string} userOwnerId
   * @param {string} sportId
   * @param {string} lang
   * @param {string} name
   * @param {string} instructions
   * @param {string} videoUrl
   * @param {string} isPrivate
   * @return {object} Mongoose query object
   */
  create(
    userOwnerId,
    sportId,
    lang,
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
          lang,
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
  read(query = {}) {
    return Exercise.find(query)
  },

  /**
   * @param {object} match Mongo match object
   * @param {object} query Mongo query object
   * @param {object} options Mongo options object
   * @return {object} Mongoose query object
   */
  updateOne(match = {}, query = {}, options = {}) {
    return Exercise.findOneAndUpdate(match, query, options)
  },

  /**
   * @param {string} id exercise id required
   */
  del(id) {
    return Exercise.deleteOne({ _id: { $eq: id } })
  },
}
