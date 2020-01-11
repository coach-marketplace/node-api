'use strict'

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const User = require('../../models/user')

const exposeFields = '_id email first_name last_name google'

module.exports = {
  getUsers() {
    return User.find()
      .select(exposeFields)
      .exec()
  },

  getUserById(userId) {
    return User.find({ _id: userId })
      .select(exposeFields)
      .exec()
  },

  getUserByEmail(userEmail) {
    return User.find({ email: userEmail })
      .select('_id email first_name last_name password')
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
