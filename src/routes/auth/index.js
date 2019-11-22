'use strict'

const authRouter = require('express').Router()

const auth = require('../../middleware/auth')
const authController = require('../../controllers/auth')

authRouter.get('/me', auth.isAuth, authController.getMe)
authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)

module.exports = authRouter
