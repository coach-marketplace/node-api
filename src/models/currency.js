'use strict'

/**
 * Currencies will respect ISO-4217
 * We define the currency as `name` and the name as `label`
 *
 * https://en.wikipedia.org/wiki/ISO_4217
 * https://www.iso.org/iso-4217-currency-codes.html
 */

const mongoose = require('mongoose')

const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const currencySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  /**
   * Name is the unique name base on ISO
   * e.g. => 'EUR'
   */
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
  },

  /**
   * Label is the label that we want to display
   */
  label: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  /**
   * Symbol is the sign of the currency
   * e.g. '€'
   */
  symbol: {
    type: String,
    required: true,
    trim: true,
  },
})

currencySchema.plugin(timestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

module.exports = mongoose.model('Currency', currencySchema)
