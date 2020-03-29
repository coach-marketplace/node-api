'use strict'

const mongoose = require('mongoose')

const Offer = require('../../models/offer')

module.exports = {
  addOffer(newOfferData) {
    const { coach, title, description, price, address, location } = newOfferData
    const newOffer = new Offer({
      _id: new mongoose.Types.ObjectId(),
      coach: new mongoose.Types.ObjectId(coach),
      title,
      description,
      price: price,
      address: address,
      location: {
        type: "Point",
        coordinates: location,
      },
    })
    return newOffer.save()
  },

  getAllOffers() {
    return Offer.find()
  },

  getOffer(id) {
    return Offer.findOne({_id:new mongoose.Types.ObjectId(id)});
  },

  async searchOffers(query) {
    var query  = Offer.find( { $text: { $search: query } } );
    var offers = await query.exec().then(results => {return results}); 
    return offers;
  },
}
