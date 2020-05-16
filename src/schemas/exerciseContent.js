'use strict'

const Schema = require('mongoose').Schema

const { LOCALE, LOCALES } = require('../_utils/constants')

const exerciseSchema = new Schema({
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

  instructions: {
    type: String,
    trim: true,
  },

  videoUrl: {
    type: String,
  },
})

module.exports = exerciseSchema
