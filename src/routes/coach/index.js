'use strict'

const coachRouter = require('express').Router()

const { readCoaches } = require('../../controllers/coach/index.js')

coachRouter.get('/', readCoaches)

module.exports = coachRouter
