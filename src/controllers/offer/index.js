'use strict'

const {
  addOffer,
} = require('./queries.js')

module.exports = {
  /**
   * Create an offer
   */
  createOffer: async (req, res) => {
    try {
      const { coach, name, description, price } = req.body
      const newOfferData = {  coach: coach,
                              name: name,
                              decription: description,
                              price: price};
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
      const offers = await getAllOffers();
      res.status(201).json(offers);
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all offers',
        debug_message: error.message,
      })
    }
  },
}
