'use strict'

const authRouter = require('express').Router()

const { authJWT, authLocal, authGoogle } = require('../../middleware/auth')
const { getMe, register, login } = require('../../controllers/auth')

authRouter
  .get('/me', authJWT, getMe)
  .post('/register', register)
  .post('/login', authLocal, login)
  // .get('/login-google', authGoogle)
  // .get('/google/callback', authGoogle, (req, res) => {
    // console.log('USER', req.user)
    // console.log('++', req.headers)
    // console.log('++', req.body)
    // res.redirect('http://localhost:3000/')
  })

module.exports = authRouter
