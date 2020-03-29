'use strict'

const langRouter = require('express').Router()

const {
  retrieveLangs,
  createLang,
  retrieveLang,
} = require('../controllers/lang')

langRouter
  .get('/', retrieveLangs)
  .post('/', createLang)
  .get('/:id', retrieveLang)

module.exports = langRouter
