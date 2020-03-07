'use strict'

const { USER_ACCOUNT_TYPE } = require('../../_utils/constants')

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const User = require('../../models/user')

const getExposedFields = (options = {}) => {
  let fieldToExpose = '_id email first_name last_name accounts'
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

  read(query = {}, options = {}) {
    return User.find(query)
      .select(getExposedFields(options))
      .exec()
  },

  create(data) {
    const newUserData = {
      _id: new mongoose.Types.ObjectId(),
      email: data.email,
    }
    data.first_name && (newUserData.first_name = data.firstName)
    data.last_name && (newUserData.last_name = data.lastName)
    if (data.password) {
      const account = {
        type: USER_ACCOUNT_TYPE.LOCAL,
        password: data.password,
      }
      newUserData.accounts = [account]
      console.log('accounts', newUserData)
    }
    // TODO: set google is exist
    // if (data.google_id) {
    //   const account = [{ type:id: data.google_id }]
    //   data.google_avatar && (google.picture = data.google_avatar)
    //   newUserData.google = google
    // }

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
