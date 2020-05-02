'use strict'

const mongoose = require('mongoose')

const User = require('../../models/user')

module.exports = {
  /**
   * @param {string} query Mongo query
   * @return Mongoose query object
   */
  read(query = {}) {
    return User.find(query)
  },

  /**
   * @param {object} data User data
   */
  create(data) {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      ...data,
    })

    return newUser.save()
  },

  // TODO: replace by findAndModify du to deprecation warning
  // https://mongoosejs.com/docs/deprecations.html
  // https://www.journaldev.com/6221/mongodb-findandmodify-example
  /**
   * @param {string} userId Id of the user to update
   * @param {object} newData Data to update
   */
  updateOne(userId, newData) {
    return User.findOneAndUpdate(
      { _id: userId },
      { $set: newData },
      { new: true }, // new is use to return the document after updating
    )
  },

  /**
   * @param {string} userId
   * @param {object} dataToPush
   */
  pushOne(userId, dataToPush) {
    return User.update({ _id: userId }, { $push: dataToPush })
  },

  /**
   * @param {string} id User id
   * @return Mongoose query object
   */
  deleteOne(id) {
    return User.deleteOne({ _id: { $eq: id } })
  },

  editUserPassword(userId, newPassword) {
    return User.findOneAndUpdate(
      { _id: userId, 'accounts.type': 'local' },
      { $set: { 'accounts.$.password': newPassword } },
      { new: true },
    )
  },

  getUserPassword(userId) {
    return User.findOne(
      { _id: userId, 'accounts.type': 'local' },
      { 'accounts.$.password': 1 },
    )
  },
}
