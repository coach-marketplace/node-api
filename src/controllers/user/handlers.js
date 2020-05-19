'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const {
  create,
  read,
  deleteOne,
  updateOne,
  pushOne,
  editUserPassword,
} = require('./queries.js')
const { USER_ACCOUNT_TYPE } = require('../../_utils/constants')
const { compareHash, encryptString } = require('../../_utils/hashing')
const { generateUniqueToken } = require('../../_utils/helpers')

/**
 * Function who will return only exposed fields
 * @param {object} user Data of ruse from database
 */
const getExposedUserData = (user, mode = 'light') => {
  // TODO: add other modes
  const exposedData = {}

  exposedData._id = user._id
  exposedData.email = user.email
  exposedData.firstName = user.firstName
  exposedData.lastName = user.lastName
  exposedData.phone = user.phone

  return exposedData
}

/**
 * @param {string} email user email
 * @param {string} firstName user first name
 * @param {string} lastName user last name
 * @param {string} phone user phone
 * @param {string} password user password
 * @param {boolean} isCoach If the user is a coach
 * @return {object} New users
 */
const createUser = async (
  email,
  firstName,
  lastName,
  phone,
  password,
  isCoach,
) => {
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
}

/**
 * @param {string} id User id
 * @param {object} newData User data to edit
 * @return {object} Edited user
 */
// TODO: validation data
const editUser = async (id, newData) => {
  if (!id) throw new Error('Id is required')
  if (!ObjectId.isValid(id)) throw new Error('id is invalid')

  const userToUpdate = (await read({ _id: id }))[0]

  if (!userToUpdate) throw new Error('User not found')

  const updatedData = {
    email: newData.hasOwnProperty('email') ? newData.email : userToUpdate.email,
    firstName: newData.hasOwnProperty('firstName')
      ? newData.firstName
      : userToUpdate.firstName,
    lastName: newData.hasOwnProperty('lastName')
      ? newData.lastName
      : userToUpdate.lastName,
    phone: newData.hasOwnProperty('phone') ? newData.phone : userToUpdate.phone,
    dateOfBirth: newData.hasOwnProperty('dateOfBirth')
      ? newData.dateOfBirth
      : userToUpdate.dateOfBirth,
    gender: newData.hasOwnProperty('gender')
      ? newData.gender
      : userToUpdate.gender,
    lang: newData.hasOwnProperty('lang') ? newData.lang : userToUpdate.lang,
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
    onlineSocketId: newData.hasOwnProperty('onlineSocketId')
      ? newData.onlineSocketId
      : userToUpdate.onlineSocketId,
  }

  const updatedUser = await updateOne(id, updatedData)

  return updatedUser
}

/**
 * @param {string} userId User id
 * @param {object} newAccount New account to add
 */
const addAccount = async (userId, newAccount) => {
  const updatedUser = await pushOne(userId, { accounts: newAccount })

  return updatedUser
}

/**
 * @return {array} List of users
 */
const getAllUsers = async () => await read()

/**
 * @param {string} id User id
 * @return {object} User
 */
const getUserById = async (id) => {
  if (!id) throw new Error('User id is required')

  const users = await read({ _id: id }).lean()

  if (!users.length) throw new Error('User not found')

  return users[0]
}

/**
 * @param {string} email User email
 * @return {object} User
 */
const getUserByEmail = async (email) => {
  if (!email) throw new Error('email is required')

  const users = await read({ email }).lean()

  if (!users.length) throw new Error('User not found')

  return users[0]
}

/**
 * @param {string} email User email
 * @return {object} User
 */
const checkUserExistenceByEmail = async (email) => {
  if (!email) throw new Error('email is required')

  const users = await read({ email }).lean()

  return users.length
}

/**
 * @param {string} id User id
 * @return {boolean} True is user is correctly deleted
 */
const deleteUserById = async (id) => {
  if (!id) throw new Error('id is required')

  await deleteOne(id)

  // TODO: Check if it's the best thing to return
  return true
}

/**
 * @param {string} id User id
 * @return {boolean} True is user is correctly archived
 */
const toggleArchiveUserById = async (id, value) => {
  if (!id) throw new Error('id is required')
  if (!ObjectId.isValid(id)) throw new Error('Id is invalid')

  const updatedUser = await updateOne(id, { isArchived: value })

  return updatedUser
}

/**
 * Connect user mean put him in `online` mode
 * @param {string} userId User id
 * @param {string} socketId Socket id
 */
const connectUser = async (userId, socketId) => {
  const updatedUser = await editUser(userId, { onlineSocketId: socketId })

  return updatedUser
}

/**
 * Disconnect user mean put him in `offline` mode
 * @param {string} socketId Socket id
 */
const disconnectUserBySocketId = async (socketId) => {
  const users = await read({ onlineSocketId: socketId }).lean()

  let updatedUser
  if (users.length) {
    updatedUser = await editUser(users[0]._id, { onlineSocketId: null })
  }

  return updatedUser
}

const updateUserPassword = async (userId, currentPwd, newPwd) => {
  console.log('hello')
  let user = await getUserById(userId)
  let localUserAccount = user.accounts.find(
    (account) => account.type === USER_ACCOUNT_TYPE.LOCAL,
  )

  if (!localUserAccount) throw new Error('no local account for this user')

  if (await compareHash(currentPwd, localUserAccount.password)) {
    let encryptedPwd = await encryptString(newPwd)
    console.log(encryptedPwd)
    return await editUserPassword(userId, encryptedPwd)
  } else {
    throw new Error('Invalid password')
  }
}

module.exports = {
  getExposedUserData,
  createUser,
  editUser,
  addAccount,
  getAllUsers,
  getUserById,
  getUserByEmail,
  checkUserExistenceByEmail,
  deleteUserById,
  toggleArchiveUserById,
  connectUser,
  disconnectUserBySocketId,
  updateUserPassword,
}
