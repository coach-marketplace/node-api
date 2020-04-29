/* eslint-disable no-undef */
'use strict'

global.log = require('./_utils/helpers').log
global.DEFAULT_LANG = 'en'

require('dotenv').config({
  path: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')
const cookieSession = require('cookie-session')

// Setup passport authentication
require('./services/passport')
const doc = require('./doc')
const router = require('./routes')
const errorController = require('./controllers/error')

const app = express()

app
  .use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days in milliseconds
      keys: [process.env.COOKIE_KEY],
    }),
  )
  .use(cors())
  .use('/files', express.static('static'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json({}))
  .use(passport.initialize())
  .use(passport.session())

if (process.env.NODE_ENV === 'local') {
  app.use(morgan('dev'))
}

doc(app)
router(app)

app.use(errorController.send404)

module.exports = app
