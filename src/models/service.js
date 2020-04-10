'use strict'

const mongoose = require('mongoose')

const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const currencySchema = require('../schemas/currency')

const serviceSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  /**
   * Price is store in cent
   * so 1€ is store like this: 100
   */
  price: {
    type: Number,
  },

  currency: currencySchema,

  address: {
    type: String,
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], //always [long, lat]
      required: true,
    },
  },
})

serviceSchema.plugin(timestamp)

module.exports = mongoose.model('Service', serviceSchema)
