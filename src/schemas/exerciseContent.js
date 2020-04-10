'use strict'

const Schema = require('mongoose').Schema

const exerciseSchema = new Schema({
  lang: {
    type: Schema.Types.ObjectId,
    ref: 'Lang',
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
