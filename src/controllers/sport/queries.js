'use strict'

const mongoose = require('mongoose')

const Sport = require('../../models/sport')
const SportContent = require('../../models/sport/sport-content')

module.exports = {
  /**
   * @return Mongoose query object
   */
  createSport() {
    const newSport = new Sport({
      _id: new mongoose.Types.ObjectId(),
    })

    return newSport.save()
  },

  /**
   * @param {object} data { sport, lang, name }
   * @return Mongoose query object
   */
  createSportContent(data) {
    const newSportContent = new SportContent({
      _id: new mongoose.Types.ObjectId(),
      sport: new mongoose.Types.ObjectId(data.sport),
      lang: new mongoose.Types.ObjectId(data.lang),
      name: data.name,
    })

    return newSportContent.save()
  },

  /**
   * @param {object} query Mongo query object
   * @return Mongoose query object
   */
  readSport(query = {}) {
    return Sport.find(query)
  },

  /**
   * @param {object} query Mongo query object
   * @return Mongoose query object
   */
  readSportContent(query = {}) {
    return SportContent.find(query)
  },
}
