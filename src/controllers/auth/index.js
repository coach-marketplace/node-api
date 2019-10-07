'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
      bcrypt.hash(password, 10, async (error, hash) => {
        if (error) {
          throw new Error('Hash error: ' + error)
        } else {
          const newUser = await userQueries.create({
            email,
            password: hash,
          })
          res.status(201).json(newUser)
        }
      })
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
      bcrypt.compare(password, user.password, (error, isPasswordCorrect) => {
        console.log('++', error)
        console.log('++2', isPasswordCorrect)
        if (error || !isPasswordCorrect) {
          res.status(401).json({
            public_message: 'Email or password invalid',
            debug_message: 'Email or passord incorrect (2)',
          })
        } else {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            },
          )
          res.status(201).json({ token })
        }
      })
    } catch (error) {
      res.status(500).json({
        public_message: 'Email or password invalid',
        debug_message: error.message,
      })
    }
  },
}
