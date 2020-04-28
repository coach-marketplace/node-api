'use strict'

const Schema = require('mongoose').Schema

const workoutSchema = new Schema({
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

  content: {
    type: String,
  },
})

module.exports = workoutSchema
