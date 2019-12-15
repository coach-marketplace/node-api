/* eslint-disable no-undef */
'use strict'

require('dotenv').config({
  path: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const doc = require('../doc')
const router = require('./routes')
const errorController = require('./controllers/error')

const app = express()

app
  .use(cors())
  .use('/files', express.static('static'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json({}))

if (process.env.NODE_ENV === 'local') {
  app.use(morgan('dev'))
}

doc(app)
router(app)

app.use(errorController.send404)

module.exports = app
