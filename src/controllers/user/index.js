'use strict'

const { encryptString } = require('../../_utils/hashing')
const {
  addUser,
  getUsers,
  getUserById,
  editUser,
  deleteUserById,
} = require('./queries.js')
const { getCoachByUserId } = require('../coach/queries.js')

module.exports = {
  /**
   * Create a user
   */
  createUser: async (req, res) => {
    try {
      const { email, firstName, lastName, password } = req.body
      const newUserData = { email }
      firstName && (newUserData.firstName = firstName)
      lastName && (newUserData.lastName = lastName)
      password && (newUserData.password = await encryptString(password))
      const newUser = await addUser(newUserData)
      res.status(201).json(newUser)
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot create user',
        debug_message: error.message,
      })
    }
  },

  /**
   * Get all users
   */
  readUsers: async (_req, res) => {
    try {
      const response = await getUsers()
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({
        public_message: 'No users',
        debug_message: error.message,
      })
    }
  },

  /**
   * Get one user
   */
  readUser: async (req, res) => {
    try {
      const userId = req.params.id
      const user = (await getUserById(userId))[0]
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({
        public_message: 'User not found',
        debug_message: error.message,
      })
    }
  },

  /**
   * Update one user
   */
  updateUser: async (req, res) => {
    try {
      const { email, firstName, lastName, password } = req.body
      const { id } = req.params
      const updatedData = {}
      email && (updatedData.email = email)
      firstName && (updatedData.first_name = firstName)
      lastName && (updatedData.last_name = lastName)
      password && (updatedData.password = await encryptString(password))
      const newUser = await editUser(id, updatedData)
      res.status(200).json(newUser)
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot update the user',
        debug_message: error.message,
      })
    }
  },

  /**
   * Delete one user
   */
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params
      const coach = (await getCoachByUserId(id))[0]
      if (coach) {
        res.status(401).json({
          public_message: 'Cannot delete the caoch user',
        })
        return
      }
      await deleteUserById(id)
      res.status(200).json({ message: 'User deleted' })
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot delete the user',
        debug_message: error.message,
      })
    }
  },
}
