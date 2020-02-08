'use strict'

const { pick } = require('lodash')

const { encryptString } = require('../../_utils/hashing')
const { addUser, getUserByEmail, editUser } = require('../user/queries.js')

module.exports = {
  register: async (req, res) => {
    try {
      const { email, firstName, lastName, password } = req.body
      if (!email || !password) {
        throw new Error('Email and Password are required')
      }
      let user = (await getUserByEmail(email, { withPassword: true }))[0]
      if (user && user.password) {
        throw new Error('Already register')
      }
      if (user && !user.password) {
        user = await editUser(user._id, {
          password: await encryptString(password),
        })
      } else if (!user) {
        user = await addUser({
          email,
          firstName,
          lastName,
          password: await encryptString(password),
        })
      }
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error while trying to sign up',
        debug_message: error.message,
      })
    }
  },

  login: async (req, res) => {
    res.status(201).json(req.user)
  },

  getMe: async (req, res) => {
    try {
      res.status(201).json({
        user: pick(req.user, ['email', 'first_name', 'last_name', '_id']),
      })
    } catch (error) {
      res.status(500).json({
        public_message: 'Unauthorized',
        debug_message: error.message,
      })
    }
  },
}
