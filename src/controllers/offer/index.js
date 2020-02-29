'use strict'

const { addOffer, getAllOffers, getOffer } = require('./queries.js')

module.exports = {
  /**
   * Create an offer
   */
  createOffer: async (req, res) => {
    try {
      const { coach, title, description, price } = req.body
      const newOfferData = {
        coach: coach,
        title: title,
        description: description,
        price: price,
      }
      /*description && (newCoachData.description = description)
      displayName && (newCoachData.displayName = displayName)*/
      const newOffer = await addOffer(newOfferData)
      res.status(201).json(newOffer)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in offer creation',
        debug_message: error.message,
      })
    }
  },

  /**
   * get all offers
   */
  readOffers: async (req, res) => {
    try {
      const offers = await getAllOffers()
      res.status(201).json(offers)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all offers',
        debug_message: error.message,
      })
    }
  },

  /**
   * Find offer by id
   **/
  getOfferById: async (req, res) => {
    try {
      const offer = await getOffer(req.params.id)
      res.status(201).json(offer)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all offers',
        debug_message: error.message,
      })
    }
  },
}
