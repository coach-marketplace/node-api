'use strict'

const authRouter = require('express').Router()

const { isAuth, auth, isAuth2 } = require('../../middleware/auth')
const { getMe, register, login } = require('../../controllers/auth')

authRouter
  .get('/me', isAuth, getMe)
  .post('/register', register)
  .post('/login', login)
  .get('/google', auth)
  .get('/google/callback', isAuth2, (req, res) => {
    console.log('USER', req.user)
    res.redirect('http://localhost:3000/')
  })

module.exports = authRouter
