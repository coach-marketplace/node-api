'use strict'

const authRouter = require('express').Router()

const { authLocal, authGoogle } = require('../middleware/auth')
const { registerLocal, login, loginWithGoogle } = require('../controllers/auth')

authRouter
  .post('/register-local', registerLocal)
  .post('/login-local', authLocal, login)
  .get('/login-google', authGoogle)
  .get('/google/callback', authGoogle, loginWithGoogle)

module.exports = authRouter
