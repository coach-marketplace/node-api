'use strict'

const mongoose = require('mongoose')

const PhysicalMetrics = require('../../models/physical-metrics')

module.exports = {
  /**
   * @param {string} userId
   * @param {number} weight
   * @param {string} weightUnit
   * @param {number} height
   * @param {string} heightUnit
   * @return {object} Mongoose query object
   */
  create(userId, weight, weightUnit, height, heightUnit) {
    const newContact = new PhysicalMetrics({
      _id: new mongoose.Types.ObjectId(),
      user: new mongoose.Types.ObjectId(userId),
      weight: {
        value: weight,
        weightUnit,
      },
      height: {
        value: height,
        heightUnit,
      },
    })

    return newContact.save()
  },

  /**
   * @param {query} query Query object
   * @return {object} Mongoose query object
   */
  read(query = {}) {
    return PhysicalMetrics.find(query)
  },
}
