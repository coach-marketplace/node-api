'use strict'

const authRouter = require('express').Router()
const passport = require('passport')

const { isAuth } = require('../../middleware/auth')
const { getMe, register, login } = require('../../controllers/auth')

authRouter
  .get('/me', isAuth, getMe)
  .post('/register', register)
  .post('/login', login)
  .get(
    '/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  )
  .get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // res.status(200).json({ data: req.user })
      res.redirect('http://localhost:3000/')
    },
  )

module.exports = authRouter
