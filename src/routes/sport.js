'use strict'

const sportRouter = require('express').Router()

const {
  retrieveSports,
  retrieveSport,
  createSport,
} = require('../controllers/sport')

sportRouter
  .get('/', retrieveSports)
  .post('/', createSport)
  .get('/:id', retrieveSport)

module.exports = sportRouter
