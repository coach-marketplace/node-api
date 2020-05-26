'use strict'

const mongoose = require('mongoose')

const Assignment = require('../../models/assignment')

module.exports = {
  /**
   * @param {string} programId
   * @param {string} traineeId
   * @param {string} startDate
   * @return {object} Mongoose query object
   */
  create(programId, traineeId, startDate) {
    const newAssignment = new Assignment({
      _id: new mongoose.Types.ObjectId(),
      program: new mongoose.Types.ObjectId(programId),
      trainee: new mongoose.Types.ObjectId(traineeId),
      startDate,
    })

    return newAssignment.save()
  },

  /**
   * @param {object} query Mongo query object
   * @return {object} Mongoose query object
   */
  read(query = {}) {
    return Assignment.find(query)
  },

  /**
   * @param {object} query Match
   * @param {object} data Data to update
   * @param {object} options Mongo options object
   * @return {object} Mongoose query object
   */
  updateOne(query = {}, data = {}, options = {}) {
    return Assignment.findOneAndUpdate(query, data, options)
  },

  /**
   * @param {string} assignmentId required
   */
  del(assignmentId) {
    return Assignment.deleteOne({ _id: { $eq: assignmentId } })
  },
}
