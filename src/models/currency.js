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
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
})

currencySchema.plugin(timestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

module.exports = mongoose.model('Currency', currencySchema)
