'use strict'

const { encryptString } = require('../../_utils/hashing')
const { save, read, delOne } = require('./queries.js')
const { USER_ACCOUNT_TYPE } = require('../../_utils/constants')

module.exports = {
  createUser: async data => {
    const { email, firstName, lastName, password } = data

    if (!email) throw new Error('Email is required')

    const newUserData = { email }
    firstName && (newUserData.firstName = firstName)
    lastName && (newUserData.lastName = lastName)

    if (password) {
      const newLocalAccount = {
        type: USER_ACCOUNT_TYPE.LOCAL,
        password: await encryptString(password),
      }
      newUserData.accounts = [newLocalAccount]
    }

    const newUser = await save(newUserData)

    return newUser
  },

  retrieveUsers: async query => {
    const users = await read(query)

    return users
  },

  deleteUserById: async userId => {
    const response = await delOne({ _id: { $eq: userId } })

    return response
  },
}
