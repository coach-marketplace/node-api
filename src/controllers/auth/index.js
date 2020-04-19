'use strict'

const { register } = require('./handlers')
const { getUserById } = require('../user/handlers')
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
    const user = await getUserById(req.user._id)
    const token = signToken({ _id: user._id, isAdmin: user.isAdmin })

    res.status(201).json({ token: `Bearer ${token}` })
  },
}
