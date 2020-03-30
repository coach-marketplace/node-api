'use strict'

const passport = require('passport')

module.exports = {
  requireJWTAuth: (req, res, next) => {
    passport.authenticate('jwt', (_err, user) => {
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' })
      }
      req.user = user

      return next()
    })(req, res, next)
  },

  authGoogle: passport.authenticate('google', { scope: ['profile', 'email'] }),

  authLocal: (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user) => {
      if (error) {
        res.status(500).json({ message: error.message })
      }
      req.user = user

      return next()
    })(req, res, next)
  },
}
