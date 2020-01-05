'use strict'

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const Sport = require('../../models/user')

module.exports = {
  getSports() {
    return Sport.find()
      .select('_id name')
      .exec()
  },

  getSportById(sportId) {
    return Sport.find({ _id: sportId })
      .select('_id name')
      .exec()
  },

  getSportByName(sportName) {
    return Sport.find({ name: sportName })
      .select('_id name')
      .exec()
  },

  addSport(newSportData) {
    const newSport = new Sport({
      _id: new mongoose.Types.ObjectId(),
      name: newSportData.name,
    })
    return newSport.save()
  },

  updateSport(sportId, newSportData) {
    return Sport.findOneAndUpdate({ _id: sportId }, newSportData, {
      new: true,
    })
  },

  deleteSport(sportId) {
    return Sport.deleteOne({ _id: { $eq: sportId } })
  },
}
