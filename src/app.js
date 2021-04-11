/* eslint-disable no-undef */
'use strict'

global.log = require('./_utils/helpers').log

require('dotenv').config({
  path: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')

require('./services/passport')
const database = require('./database')
const doc = require('./doc')
const router = require('./routes')
const errorController = require('./controllers/error')

const app = express()

app
  .use(cors())
  .use('/files', express.static('static'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json({}))
  .use(passport.initialize())
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    }),
  )

if (process.env.NODE_ENV === 'local') {
  app.use(morgan('dev'))
}

if (['local'].includes(process.env.NODE_ENV)) {
  doc(app)
}
router(app)

app.use(errorController.send404)

database.connect()
mongoose.connection.on('connected', () =>
  console.log('--- Database connected ---'),
)
mongoose.connection.on('error', () =>
  console.log('--- Database connection error ---'),
)

module.exports = app
