'use strict'

const authRouter = require('express').Router()

const { requireJWTAuth, authLocal } = require('../middleware/auth')
const { registerLocal, login, getAuthUser } = require('../controllers/auth')

authRouter
  .get('/me', requireJWTAuth, getAuthUser)
  .post('/register-local', registerLocal)
  .post('/login-local', authLocal, login)
// .get('/login-google', authGoogle)
// .get('/google/callback', authGoogle, (req, res) => {
// console.log('USER', req.user)
// console.log('++', req.headers)
// console.log('++', req.body)
// res.redirect('http://localhost:3000/')
// })

module.exports = authRouter
