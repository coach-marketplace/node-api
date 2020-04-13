'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { create, read, deleteOne, updateOne } = require('./queries.js')
const { USER_ACCOUNT_TYPE } = require('../../_utils/constants')
const { encryptString } = require('../../_utils/hashing')
const { generateUniqueToken } = require('../../_utils/helpers')

module.exports = {
  /**
   * @param {string} email user email
   * @param {string} firstName user first name
   * @param {string} lastName user last name
   * @param {string} phone user phone
   * @param {string} password user password
   * @param {boolean} isCoach If the user is a coach
   * @return {object} New users
   */
  createUser: async (email, firstName, lastName, phone, password, isCoach) => {
    if (!email) throw new Error('Email is required')

    // TODO: field validation
    const newUserData = {
      email,
      firstName,
      lastName,
      phone,
      isCoach,
      isEmailVerified: false,
      emailToken: generateUniqueToken(),
    }

    if (password) {
      const newLocalAccount = {
        type: USER_ACCOUNT_TYPE.LOCAL,
        password: await encryptString(password),
      }
      newUserData.accounts = [newLocalAccount]
    }

    const newUser = await create(newUserData)

    return newUser
  },

  /**
   * @param {string} id User id
   * @param {object} newData User data to edit
   * @return {object} Edited user
   */
  // TODO: validation data
  editUser: async (id, newData) => {
    if (!id) throw new Error('Id is required')
    if (!ObjectId.isValid(id)) throw new Error('id is invalid')

    const userToUpdate = (await read({ _id: id }))[0]

    if (!userToUpdate) throw new Error('User not found')

    const updatedData = {
      isArchived: newData.hasOwnProperty('isArchived')
        ? newData.isArchived
        : userToUpdate.isArchived,
      isCoach: newData.hasOwnProperty('isCoach')
        ? newData.isCoach
        : userToUpdate.isCoach,
      isEmailVerified: newData.hasOwnProperty('isEmailVerified')
        ? newData.isEmailVerified
        : userToUpdate.isEmailVerified,
      email: newData.hasOwnProperty('email')
        ? newData.email
        : userToUpdate.email,
      firstName: newData.hasOwnProperty('firstName')
        ? newData.firstName
        : userToUpdate.firstName,
      lastName: newData.hasOwnProperty('lastName')
        ? newData.lastName
        : userToUpdate.lastName,
      phone: newData.hasOwnProperty('phone')
        ? newData.phone
        : userToUpdate.phone,
      emailToken: newData.hasOwnProperty('emailToken')
        ? newData.emailToken
        : userToUpdate.emailToken,
      emailConfirmedAt: newData.hasOwnProperty('emailConfirmedAt')
        ? newData.emailConfirmedAt
        : userToUpdate.emailConfirmedAt,
    }

    const updatedUser = await updateOne(id, updatedData)

    return updatedUser
  },

  /**
   * @return {array} List of users
   */
  getAllUsers: async () => await read(),

  /**
   * @param {string} id User id
   * @return {object} User
   */
  getUserById: async (id) => {
    if (!id) throw new Error('id is required')

    const users = await read({ _id: id }).lean()

    return users.length ? users[0] : null
  },

  /**
   * @param {string} email User email
   * @return {object} User
   */
  getUserByEmail: async (email) => {
    if (!email) throw new Error('id is required')

    const users = await read({ email })

    return users.length ? users[0] : null
  },

  /**
   * @param {string} id User id
   * @return {boolean} True is user is correctly deleted
   */
  deleteUserById: async (id) => {
    if (!id) throw new Error('id is required')

    await deleteOne(id)

    // TODO: Check if it's the best thing to return
    return true
  },

  /**
   * @param {string} id User id
   * @return {boolean} True is user is correctly archived
   */
  toggleArchiveUserById: async (id, value) => {
    if (!id) throw new Error('id is required')
    if (!ObjectId.isValid(id)) throw new Error('Id is invalid')

    const updatedUser = await updateOne(id, { isArchived: value })

    return updatedUser
  },
}
