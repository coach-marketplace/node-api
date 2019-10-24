'use strict'

require('dotenv').config({
  path: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
})
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const router = require('./routes')
const errorController = require('./controllers/error')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({}))
app.use(morgan('dev'))

router(app)

app.use(errorController.send404)

module.exports = app
