'use strict'

/**
 * Currencies will respect ISO-4217
 * We define the currency as `name` and the name as `label`
 *
 * https://en.wikipedia.org/wiki/ISO_4217
 * https://www.iso.org/iso-4217-currency-codes.html
 */

const Schema = require('mongoose').Schema

const { CURRENCY } = require('../_utils/constants')

const currencySchema = new Schema({
  /**
   * Name is the unique name base on ISO
   * e.g. => 'USD'
   */
  name: {
    type: String,
    required: true,
    enum: Object.keys(CURRENCY).map((key) => CURRENCY[key].NAME),
  },

  /**
   * Label is the label that we want to display
   * e.g => United States dollar
   */
  label: {
    type: String,
    required: true,
    enum: Object.keys(CURRENCY).map((key) => CURRENCY[key].LABEL),
  },

  /**
   * Symbol is the sign of the currency
   * e.g. '$'
   */
  symbol: {
    type: String,
    required: true,
    enum: Object.keys(CURRENCY).map((key) => CURRENCY[key].SYMBOL),
  },
})

module.exports = currencySchema
