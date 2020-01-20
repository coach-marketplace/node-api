'use strict'

const authRouter = require('express').Router()
const passport = require('passport')

const { isAuth, auth, isAuth2, authLocal } = require('../../middleware/auth')
const { getMe, register, login } = require('../../controllers/auth')

authRouter
  .get('/you', (req, res) => {
    console.log('+/.', Object.keys(req))
    console.log('__', req.session.cookie)
    res.send('ok')
  })
  .get('/me', isAuth, getMe)
  .post('/register', register)
  // .post('/login', login)
  .post(
    '/login',
    (req, res, next) => {
      // console.log('sess', req.session)
      // req.session = { test: 're' }
      next()
    },
    passport.authenticate('local'),
    (req, res) => {
      // const u = req.user
      // console.log('ok', u.password)
      // u.password = undefined
      // console.log('ok', u.password)

      res.status(201).json({ user: req.user, ses: req.session })
    },
  )
  .get('/google', auth)
  .get('/google/callback', isAuth2, (req, res) => {
    console.log('USER', req.user)
    res.redirect('http://localhost:3000/')
  })

module.exports = authRouter
