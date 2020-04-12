'use strict'

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
    /**
     * We use getLightData to control which data from the user we want to
     * retrieve, else we get the complete mongo object
     */
    const userData = req.user.getLightData()
    const token = signToken({ ...userData })

    res.status(201).json({
      user: userData,
      token: `Bearer ${token}`,
    })
  },

  /**
   * getAuthUser
   *
   * This Middleware should be use after the passport auth with JWT Strategy
   * one. Then we should have already the user into the `req.user` done by
   * passport middleware for us.
   */
  getAuthUser: async (req, res) => {
    try {
      res.status(200).json(req.user)
    } catch (error) {
      res.status(500).json({
        public_message: 'Unauthorized',
        debug_message: error.message,
      })
    }
  },
}
