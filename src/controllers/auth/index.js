'use strict'

// const { pick } = require('lodash')

const { register } = require('./handlers')
const { signToken } = require('../../_utils/jwt')

module.exports = {
  registerLocal: async (req, res) => {
    try {
      const user = await register(req.body)

      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error while trying to register',
        debug_message: error.message,
      })
    }
  },

  login: async (req, res) => {
    const userData = req.user.getLightData()
    const token = signToken({ ...userData })

    res.status(201).json({
      user: userData,
      token: `Bearer ${token}`,
    })
  },

  // getMe: async (req, res) => {
  //   try {
  //     res.status(201).json({
  //       ...pick(req.user, ['email', 'first_name', 'last_name', '_id']),
  //     })
  //   } catch (error) {
  //     res.status(500).json({
  //       public_message: 'Unauthorized',
  //       debug_message: error.message,
  //     })
  //   }
  // },
}
