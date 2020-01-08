'use strict'

const authRouter = require('express').Router()
const passport = require('passport')

const { isAuth } = require('../../middleware/auth')
const {
  getMe,
  register,
  login,
  googleLogin,
} = require('../../controllers/auth')

authRouter
  .get('/me', isAuth, getMe)
  .post('/register', register)
  .post('/login', login)
  .post(
    '/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login'],
    }),
    googleLogin,
  )

module.exports = authRouter
