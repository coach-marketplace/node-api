'use strict'

const mongoose = require('mongoose')

const Program = require('../../models/program')

module.exports = {
  /**
   * @param {string} userOwnerId Required
   * @param {number} days Required
   * @param {string} langId Optional
   * @param {string} title Required
   * @param {string} description Optional
   * @param {array} workouts Optional - Arrays of workouts
   * @param {boolean} isArchived
   * @param {boolean} isPrivate
   * @return Created Workout
   */
  create(
    userOwnerId,
    days,
    langId,
    title,
    description,
    workouts = null,
    isArchived = false,
    isPrivate = false,
  ) {
    const newProgramData = {
      _id: new mongoose.Types.ObjectId(),
      userOwner: new mongoose.Types.ObjectId(userOwnerId),
      isArchived: isArchived,
      isPrivate: isPrivate,
      days: days,
      content: [
        {
          lang: new mongoose.Types.ObjectId(langId),
          title,
          description,
        },
      ],
    }
    workouts && (newProgramData.workouts = workouts)
    const newProgram = new Program(newProgramData)

    return newProgram.save()
  },

  /**
   * @param {Object} query
   * @return Program Object
   */
  read(query = {}) {
    return Program.find(query)
  },

  /**
   * @param {string} id
   * @param {Object} data
   * @return Program Object
   */
  updateOne(id, data) {
    return Program.updateOne({ _id: id }, data)
  },

  /**
   *
   * @param {String} id required
   */
  deleteOne(id) {
    return Program.deleteOne({ _id: { $eq: id } })
  },
}
