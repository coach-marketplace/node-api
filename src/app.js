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
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json({}))
  .use(morgan('dev'))

doc(app)
router(app)

app.use(errorController.send404)

module.exports = app
