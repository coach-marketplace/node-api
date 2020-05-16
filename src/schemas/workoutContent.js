'use strict'

const Schema = require('mongoose').Schema

const { LOCALE, LOCALES } = require('../_utils/constants')

const workoutSchema = new Schema({
  lang: {
    type: String,
    default: LOCALE.EN_US,
    enum: LOCALES,
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  instructions: {
    type: String,
  },
})

module.exports = workoutSchema
