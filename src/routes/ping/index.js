'use strict'

const pingRouter = require('express').Router()

const pingController = require('../../controllers/ping')

pingRouter.use(pingController.ping)

module.exports = pingRouter
