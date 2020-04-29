'use strict'

const authRouter = require('express').Router()

const { authLocal, authGoogle } = require('../middleware/auth')
const { registerLocal, login } = require('../controllers/auth')

authRouter
  .post('/register-local', registerLocal)
  .post('/login-local', authLocal, login)
  .get('/login-google', authGoogle)
  .get('/google/callback', authGoogle, (req, res) => {
    console.log('OK', req.user)
    res.redirect('http://localhost:3001/')
    // res.send('OOOKOKKK', req.user)
  })

module.exports = authRouter
