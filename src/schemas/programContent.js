'use strict'

const Schema = require('mongoose').Schema

const programSchema = new Schema({
  lang: {
    type: Schema.Types.ObjectId,
    ref: 'Lang',
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
  },
})

module.exports = programSchema
