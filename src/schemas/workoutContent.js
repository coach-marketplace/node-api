'use strict'

const Schema = require('mongoose').Schema

const workoutSchema = new Schema({
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

})

module.exports = workoutSchema
