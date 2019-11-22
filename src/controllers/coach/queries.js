'use strict'

const mongoose = require('mongoose')

const Coach = require('../../models/coach')
const { PUBLIC_FIELDS } = require('./constants')

module.exports = {
  getCoaches() {
    return Coach.find()
      .select(PUBLIC_FIELDS)
      .exec()
  },

  getCoachById(id) {
    return Coach.find({ _id: id })
      .select(PUBLIC_FIELDS)
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

  getCoachByUserId(id) {
    return Coach.find({ user: id })
      .select(PUBLIC_FIELDS)
      .exec()
  },
}
