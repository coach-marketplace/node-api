'use strict'

const Schema = require('mongoose').Schema

const { LOCALE, LOCALES } = require('../_utils/constants')

const sportSchema = new Schema({
  lang: {
    type: String,
    default: LOCALE.EN_US,
    enum: LOCALES,
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },
})

module.exports = sportSchema
