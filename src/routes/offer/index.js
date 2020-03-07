'use strict'

const offersRouter = require('express').Router()

const {
  createOffer,
  readOffers,
  getOfferById,
<<<<<<< HEAD
  searchOffers
=======
>>>>>>> 2f096211f61c0874938c6f5d01fa924bc06b74ae
} = require('../../controllers/offer/index.js')

offersRouter
  .get('/', readOffers)
  .post('/', createOffer)
  .get('/:id', getOfferById)
<<<<<<< HEAD
  .post('/search', searchOffers)
  /*.put('/:id', updateUser)
=======
/*.put('/:id', updateUser)
>>>>>>> 2f096211f61c0874938c6f5d01fa924bc06b74ae
  /*.get('/:id', readUser)
  .delete('/:id', deleteUser)*/

module.exports = offersRouter
