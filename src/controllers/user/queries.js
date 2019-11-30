'use strict'

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const User = require('../../models/user')

module.exports = {
  getUsers() {
    return User.find()
      .select('_id email first_name last_name password')
      .exec()
  },

  getUserById(userId) {
    return User.find({ _id: userId })
      .select('_id email first_name last_name password')
      .exec()
  },

  getUserByEmail(userEmail) {
    return User.find({ email: userEmail })
      .select('_id email first_name last_name password')
      .exec()
  },

  addUser(newUserData) {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: newUserData.email,
      first_name: newUserData.firstName || '',
      last_name: newUserData.lastName || '',
      password: newUserData.password,
    })
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
