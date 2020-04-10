'use strict'

const langRouter = require('express').Router()

const { retrieveLangs, retrieveLang } = require('../controllers/lang')

langRouter.get('/', retrieveLangs).get('/:id', retrieveLang)

module.exports = langRouter
