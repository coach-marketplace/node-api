'use strict'

const mongoose = require('mongoose')

const Offer = require('../../models/offer')

module.exports = {

  addOffer(newOfferData) {
    console.log(newOfferData)
    const { coach, title, description, price } = newOfferData
    const newOffer = new Offer({
      _id: new mongoose.Types.ObjectId(),
      coach: new mongoose.Types.ObjectId(coach),
      title,
      description,
      price: price,
    })
    console.log('coucou')
    return newOffer.save()
  },

  getAllOffers() {
    return Offer.find();
  }

}
