'use strict'

const mongoose = require('mongoose')

const Sport = require('../../models/sport')

module.exports = {
  /**
   * @param {string} langId Lang id
   * @param {string} name Name of sport
   * @return {object} Mongoose query object
   */
  createSport(langId, name) {
    const newSport = new Sport({
      _id: new mongoose.Types.ObjectId(),
      content: [
        {
          lang: new mongoose.Types.ObjectId(langId),
          name: name,
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
