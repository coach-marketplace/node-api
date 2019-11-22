'use strict'

const mongoose = require('mongoose')

const Coach = require('../../models/coach')

module.exports = {
  getCoaches() {
    return Coach.find()
      .select('user description display_name')
      .exec()
  },

  getCoachById(id) {
    return Coach.find({ _id: id })
      .select('user description display_name')
      .exec()
  },

  addCoach(newCoachData) {
    const { user, description, displayName } = newCoachData
    const newCoach = new Coach({
      _id: new mongoose.Types.ObjectId(),
      user,
      description,
      display_name: displayName,
    })

    return newCoach.save()
  },

  editCoach(id, data) {
    return Coach.findOneAndUpdate({ _id: id }, data, {
      new: true,
    })
  },

  removeCoachById(id) {
    return Coach.deleteOne({ _id: { $eq: id } })
  },
}
