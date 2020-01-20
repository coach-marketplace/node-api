'use strict'

const { pick } = require('lodash')
// const https = require('https')
// const querystring = require('querystring')
// const rp = require('request-promise')

const { encryptString, compareHash } = require('../../_utils/hashing')
const { signToken } = require('../../_utils/jwt')
const {
  addUser,
  getUserByEmail,
  getUserById,
  editUser,
} = require('../user/queries.js')

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
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw new Error('Email and Password are required')
      }
      const user = (await getUserByEmail(email))[0]
      if (!user) {
        throw new Error('Email or passord incorrect (1)')
      }
      const isMatch = await compareHash(password, user.password)
      if (!isMatch) {
        throw new Error('Email or passord incorrect (2)')
      }
      const token = signToken({ email: user.email, userId: user._id })
      res.status(201).json({ token })
    } catch (error) {
      res.status(500).json({
        public_message: 'Email or password invalid',
        debug_message: error.message,
      })
    }
  },

  getMe: async (req, res) => {
    try {
      const {
        authUser: { userId },
      } = req
      const user = (await getUserById(userId))[0]
      res
        .status(201)
        .json({ user: pick(user, ['email', 'first_name', 'last_name', '_id']) })
    } catch (error) {
      res.status(500).json({
        public_message: 'Unauthorized',
        debug_message: error.message,
      })
    }
  },
}
