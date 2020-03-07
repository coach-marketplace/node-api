'use strict'

const pingRouter = require('express').Router()

const { ping } = require('../controllers/ping')

pingRouter.use(ping)

module.exports = pingRouter
