'use strict'

const coachRouter = require('express').Router()

const { retrieveCoaches } = require('../controllers/coach')

coachRouter.get('/', retrieveCoaches)

module.exports = coachRouter
