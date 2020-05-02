'use strict'

const passport = require('passport')

const { retrieveWorkoutById } = require('../controllers/workout/handlers')

module.exports = {
  requireJWTAuth: (req, res, next) => {
    passport.authenticate('jwt', (_err, user) => {
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' })
        return
      }
      req.user = user

      return next()
    })(req, res, next)
  },

  /**
   * We need to use a callback function to access the session and store the
   * query inside to get it back from the store function from the custom
   * overwrite passport prototype helper function and pass it through google
   * redirection
   */
  authGoogle: (req, res, next) => {
    req.session.state = JSON.stringify(req.query)
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      session: false,
    })(req, res, next)
  },

  authLocal: (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user) => {
      if (user) {
        req.user = user
      }

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

    if (req.user._id !== req.params.id && !req.user.isAdmin) {
      res.status(401).json({ message: 'Unauthorized to access these data' })
      return
    }

    next()
  },

  /**
   * request to acces user's exercise, workout, or program
   */
  requireAccessMyWorkouts: async (req, res, next) => {
    if (!req.params.id) {
      res.status(401).json({ message: 'Unauthorized to access user data' })
      return
    }

    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized for un-auth user' })
      return
    }

    let workout = await retrieveWorkoutById(req.params.id)

    if (workout[0].userOwner.toString() !== req.user._id && !req.user.isAdmin) {
      res.status(401).json({ message: 'Unauthorized to access these data' })
      return
    }

    next()
  },

  /**
   * This middleware let pass only admin
   */
  onlyAdmin: (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized for un-auth user' })
      return
    }

    if (!req.user.isAdmin) {
      res.status(401).json({ message: 'Unauthorized to access admin data' })
      return
    }

    next()
  },
}
