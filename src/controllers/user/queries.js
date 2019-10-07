'use strict'

const mongoose = require('mongoose')

const User = require('../../models/User')

module.exports = {
  getAll() {
    return User.find()
      .select('_id email first_name last_name password')
      .exec()
  },

  getById(userId) {
    return User.find({ _id: userId })
      .select('_id email first_name last_name password')
      .exec()
  },

  getByEmail(userEmail) {
    return User.find({ email: userEmail })
      .select('_id email first_name last_name password')
      .exec()
  },

  create(newUserData) {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: newUserData.email,
      first_name: newUserData.firstName || '',
      last_name: newUserData.lastName || '',
      password: newUserData.password,
    })
    return newUser.save()
  },

  update(userId, newUserData) {
    return User.findOneAndUpdate({ _id: userId }, newUserData, {
      new: true,
    })
  },

  deleteById(userId) {
    return User.deleteOne({ _id: { $eq: userId } })
  },
}
