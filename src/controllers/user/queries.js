'use strict'

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const User = require('../../models/user')

const getExposedFields = (options = {}) => {
  let fieldToExpose = '_id email first_name last_name google'
  if (options.withPassword) {
    fieldToExpose += ' password'
  }
  return fieldToExpose
}

module.exports = {
  getUsers(options = {}) {
    return User.find()
      .select(getExposedFields(options))
      .exec()
  },

  getUserById(userId, options = {}) {
    return User.find({ _id: userId })
      .select(getExposedFields(options))
      .exec()
  },

  getUserByEmail(userEmail, options = {}) {
    return User.find({ email: userEmail })
      .select(getExposedFields(options))
      .exec()
  },

  addUser(data) {
    const newUserId = new mongoose.Types.ObjectId()
    const newUserData = {
      _id: newUserId,
      email: data.email,
    }
    data.firstName && (newUserData.first_name = data.firstName)
    data.lastName && (newUserData.last_name = data.lastName)
    data.password && (newUserData.password = data.password)
    if (data.google_id) {
      const google = { id: data.google_id }
      data.google_avatar && (google.picture = data.google_avatar)
      newUserData.google = google
    }

    const newUser = new User(newUserData)

    return newUser.save()
  },

  editUser(userId, newUserData) {
    return User.findOneAndUpdate({ _id: userId }, newUserData, {
      new: true,
    })
  },

  removeUserById(userId) {
    return User.deleteOne({ _id: { $eq: userId } })
  },
}
