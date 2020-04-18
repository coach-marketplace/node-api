'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const {
  create,
  read,
  deleteOne,
  updateOne,
  readBody,
  createBody,
  updateBody,
} = require('./queries.js')
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
      dateOfBirth: newData.hasOwnProperty('dateOfBirth')
        ? newData.dateOfBirth
        : userToUpdate.dateOfBirth,
      gender: newData.hasOwnProperty('gender')
        ? newData.gender
        : userToUpdate.gender,
      isArchived: newData.hasOwnProperty('isArchived')
        ? newData.isArchived
        : userToUpdate.isArchived,
      isCoach: newData.hasOwnProperty('isCoach')
        ? newData.isCoach
        : userToUpdate.isCoach,
      isAdmin: newData.hasOwnProperty('isAdmin')
        ? newData.isAdmin
        : userToUpdate.isAdmin,
      isEmailVerified: newData.hasOwnProperty('isEmailVerified')
        ? newData.isEmailVerified
        : userToUpdate.isEmailVerified,
      emailConfirmedAt: newData.hasOwnProperty('emailConfirmedAt')
        ? newData.emailConfirmedAt
        : userToUpdate.emailConfirmedAt,
      emailToken: newData.hasOwnProperty('emailToken')
        ? newData.emailToken
        : userToUpdate.emailToken,
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

    const users = await read({ _id: id })

    return users.length ? users[0] : null
  },

  /**
   * @param {string} email User email
   * @return {object} User
   */
  getUserByEmail: async (email) => {
    if (!email) throw new Error('email is required')

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

  /**
   * @param {string} userId User id
   * @return {Object} USer Body
   */
  getUserBody: async (userId) => {
    if (!userId) throw new Error('id is required')
    if (!ObjectId.isValid(userId)) throw new Error('Id is invalid')

    let user = await read({ _id: userId })
    if (!user[0].body) {
      return {}
    } else {
      return await readBody(user[0].body)
    }
  },

  /**
   * @param {String} userId User id
   * @param {Object} bodyData Updated user body data
   * @return {Object} Updated user
   */
  editUserBody: async (userId, bodyData) => {
    if (!userId) throw new Error('id is required')
    if (!ObjectId.isValid(userId)) throw new Error('Id is invalid')

    let user = await read({ _id: userId })
    let bodyId = user[0].body
    if (!bodyId) {
      let body = await createBody(bodyData)
      await updateOne(userId, { body: body._id })
      return body
    } else {
      return await updateBody(bodyId, bodyData)
    }
  },
}
