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
   * @param {string} id Exercise id to update
   * @param {string} lang Lang
   * @param {object} query Mongo query object
   * @param {object} options Mongo options object
   * @return {object} Mongoose query object
   */
  updateByLang(id, lang, query = {}, options = {}) {
    return Exercise.updateOne({ _id: id, lang }, query, options)
  },

  // return User.findOneAndUpdate(
  //   { _id: userId, 'accounts.type': 'local' },
  //   { $set: { 'accounts.$.password': newPassword } },
  //   { new: true },
  // )
}
