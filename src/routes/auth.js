'use strict'

const authRouter = require('express').Router()

const { authLocal } = require('../middleware/auth')
const { registerLocal, login } = require('../controllers/auth')

authRouter
  .post('/register-local', registerLocal)
  .post('/login-local', authLocal, login)
// .get('/login-google', authGoogle)
// .get('/google/callback', authGoogle, (req, res) => {
// res.redirect('http://localhost:3000/')
// })

module.exports = authRouter
