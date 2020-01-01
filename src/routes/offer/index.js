'use strict'

const offersRouter = require('express').Router()

const { createOffer, readOffers } = require('../../controllers/offer/index.js')

offersRouter.get('/', readOffers).post('/', createOffer)
/*.get('/:id', readUser)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser)*/

module.exports = offersRouter
