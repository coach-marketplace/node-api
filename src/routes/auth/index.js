'use strict'

const authRouter = require('express').Router()

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
  .post('/login-with-google', googleLogin)

module.exports = authRouter
