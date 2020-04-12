'use strict'

const Schema = require('mongoose').Schema

const sportSchema = new Schema({
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
})

module.exports = sportSchema
