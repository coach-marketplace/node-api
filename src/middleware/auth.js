'use strict'

// const { verifyToken } = require('../_utils/jwt')
const passport = require('passport')

module.exports = {
  // TODO: ==> rename requireAuth
  // isAuth: (req, res, next) => {
  //   try {
  //     const token = req.headers.authorization.split(' ')[1]
  //     const decoded = verifyToken(token)
  //     req.authUser = decoded
  //     next()
  //   } catch (error) {
  //     res.status(401).json({
  //       public_message: 'Unauthorized',
  //       debug_message: error.message,
  //     })
  //   }
  // },
  requireJWTAuth: passport.authenticate('jwt', { session: false }),
  authGoogle: passport.authenticate('google', { scope: ['profile', 'email'] }),
  authLocal: passport.authenticate('local', { session: false }),
}
