'use strict'

const axios = require('axios');

const {
  addOffer,
  getAllOffers,
  getOffer,
  searchOffers
} = require('./queries.js')

module.exports = {
  /**
   * Create an offer
   */
  createOffer: async (req, res) => { 
    try {
      const { coach, title, description, price, address } = req.body
      //get lon and lat from address
      axios.get("https://nominatim.openstreetmap.org/search/q="+address+"?format=json")
        .then(response => 
            console.log(response)
        );

      const newOfferData = {
        coach: coach,
        title: title,
        description: description,
        price: price,
        address: address,
        location: [50.8270397,4.3721979], //test: this is Flagey square, Ixelles
      }
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

  /**
  * Search offers with query
  **/
 searchOffers: async (req, res) => {
  try{
    var offers = null;
    const {query} = req.body
    if (!query) {
      offers = await getAllOffers()
    }
    else {
      offers = await searchOffers(query);
    }
    res.status(201).json(offers);
  } catch(error) {
    res.status(500).json({
      public_message: 'Error in searching offers',
      debug_message: error.message,
    })
  }
}


} 
