'use strict'

const authRouter = require('express').Router()

const { isAuth } = require('../../middleware/auth')
const { getMe, register, login } = require('../../controllers/auth')

authRouter
  .get('/me', isAuth, getMe)
  .post('/register', register)
  .post('/login', login)

module.exports = authRouter
