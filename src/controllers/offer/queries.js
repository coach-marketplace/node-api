'use strict'

const mongoose = require('mongoose')

const Offer = require('../../models/offer')

module.exports = {

  addOffer(newOfferData) {
    const { coach, name, description, price } = newOfferData
    const newOffer = new Offer({
      _id: new mongoose.Types.ObjectId(),
      coach,
      name,
      decription,
      price,
    })

    return newOffer.save()
  },

  getAllOffers() {
    return Offer.find();
  }

}
