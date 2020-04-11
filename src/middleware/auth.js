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

  /**
   * This middleware will allow only the auth user to pass
   * e.g. 'user-one' want to access his profile
   * - He will make a request on `user/:id/profile`
   * - We check is :id === authUser._id
   *
   * Note: This middleware assume that you are logged using
   * requireJWTAuth middleware before
   */
  requireAccessMyData: (req, res, next) => {
    if (!req.params.id) {
      res.status(401).json({ message: 'Unauthorized to access user data' })
      return
    }

    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized for un-auth user' })
      return
    }

    if (req.user._id !== req.params.id) {
      res.status(401).json({ message: 'Unauthorized to access these data' })
      return
    }

    next()
  },
}
