'use strict'

const offersRouter = require('express').Router()

const {
  createOffer,
  readOffers,
  getOfferById,
  searchOffers
} = require('../../controllers/offer/index.js')

offersRouter
  .get('/', readOffers)
  .post('/', createOffer)
  .get('/:id', getOfferById)
  .post('/search', searchOffers)
  /*.put('/:id', updateUser)
  /*.get('/:id', readUser)
  .delete('/:id', deleteUser)*/ 

module.exports = offersRouter
