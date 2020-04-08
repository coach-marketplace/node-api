'use strict'

const mongoose = require('mongoose')

const Sport = require('../../models/sport')
const SportContent = require('../../models/sport/sport-content')

module.exports = {
  /**
   * @return {object} Mongoose query object
   */
  createSport() {
    const newSport = new Sport({
      _id: new mongoose.Types.ObjectId(),
    })

    return newSport.save()
  },

  /**
   * @param {string} sportId Sport id
   * @param {string} langId Lang id
   * @param {string} name Name of sport
   * @return {object} Mongoose query object
   */
  createSportContent(sportId, langId, name) {
    const newSportContent = new SportContent({
      _id: new mongoose.Types.ObjectId(),
      sport: new mongoose.Types.ObjectId(sportId),
      lang: new mongoose.Types.ObjectId(langId),
      name: name,
    })

    return newSportContent.save()
  },

  /**
   * @param {object} query Mongo query object
   * @return {object} Mongoose query object
   */
  readSport(query = {}) {
    return Sport.find(query)
  },

  /**
   * @param {object} query Mongo query object
   * @return {object} Mongoose query object
   */
  readSportContent(query = {}) {
    return SportContent.find(query)
  },
}
