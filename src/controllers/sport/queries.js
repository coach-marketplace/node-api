'use strict'

const mongoose = require('mongoose')

const Sport = require('../../models/sport')

module.exports = {
  /**
   * @param {string} lang Lang
   * @param {string} name Name of sport
   * @return {object} Mongoose query object
   */
  createSport(lang, name) {
    const newSport = new Sport({
      _id: new mongoose.Types.ObjectId(),
      content: [
        {
          lang,
          name,
        },
      ],
    })

    return newSport.save()
  },

  /**
   * @param {object} query Mongo query object
   * @return {object} Mongoose query object
   */
  readSport(query = {}) {
    return Sport.find(query)
  },
}
