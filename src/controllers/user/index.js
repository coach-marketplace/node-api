'use strict'

const { encryptString } = require('../../_utils/hashing')
const userQueries = require('./queries.js')

module.exports = {
  /**
   * Create a user
   */
  create: async (req, res) => {
    try {
      const user = (await userQueries.getByEmail(req.body.email))[0]
      if (user) {
        throw new Error('Email already used')
      }
      const hashedPassword = await encryptString(req.body.password)
      const newUser = await userQueries.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
      })
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
  readAll: async (_req, res) => {
    try {
      const response = await userQueries.getAll()
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
  read: async (req, res) => {
    try {
      const userId = req.params.id
      const user = (await userQueries.getById(userId))[0]
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
  update: async (req, res) => {
    try {
      const userId = req.params.id
      const updatedData = {}
      req.body.email && (updatedData.email = req.body.email)
      req.body.firstName && (updatedData.first_name = req.body.firstName)
      req.body.lastName && (updatedData.last_name = req.body.lastName)
      req.body.password && (updatedData.password = await encryptString(req.body.password))
      const newUser = await userQueries.update(userId, updatedData)
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
  del: async (req, res) => {
    try {
      const userId = req.params.id
      await userQueries.deleteById(userId)
      res.status(200).json({ message: 'User deleted' })
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot delete the user',
        debug_message: error.message,
      })
    }
  },
}
