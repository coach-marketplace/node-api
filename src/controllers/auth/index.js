'use strict'

const { encryptString, compareHash } = require('../../_utils/hashing')
const { signToken } = require('../../_utils/jwt')
const userQueries = require('../user/queries.js')

module.exports = {
  signUp: async (req, res) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw new Error('Email and Password are required')
      }
      const user = (await userQueries.getByEmail(email))[0]
      if (user) {
        throw new Error('This email is already used')
      }
      const hashedPassword = await encryptString(password)
      const newUser = await userQueries.create({
        email,
        password: hashedPassword,
      })
      res.status(201).json(newUser)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error while trying to sign up',
        debug_message: error.message,
      })
    }
  },

  signIn: async (req, res) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw new Error('Email and Password are required')
      }
      const user = (await userQueries.getByEmail(email))[0]
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
}
