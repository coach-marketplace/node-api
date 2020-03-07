'use strict'

const serviceRouter = require('express').Router()

const {
  createOffer,
  readOffers,
  getOfferById,
} = require('../controllers/offer/index.js')

serviceRouter
  .get('/', readOffers)
  .post('/', createOffer)
  .get('/:id', getOfferById)
/*.put('/:id', updateUser)
  /*.get('/:id', readUser)
  .delete('/:id', deleteUser)*/

module.exports = serviceRouter
