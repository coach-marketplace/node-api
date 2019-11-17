'use strict'

const { verifyToken } = require('../_utils/jwt')

module.exports = {
  isAuth: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = verifyToken(token)
      req.authUser = decoded
      next()
    } catch (error) {
      res.status(401).json({
        public_message: 'Unauthorized',
        debug_message: error.message,
      })
    }
  },
}
