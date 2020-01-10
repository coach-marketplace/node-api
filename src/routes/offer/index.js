'use strict'

const offersRouter = require('express').Router()

const {
  createOffer,
  readOffers,
  getOfferById
} = require('../../controllers/offer/index.js')

offersRouter
  .get('/', readOffers)
  .post('/', createOffer)
  .get('/:id', getOfferById)
  /*.put('/:id', updateUser)
  .delete('/:id', deleteUser)*/

module.exports = offersRouter
