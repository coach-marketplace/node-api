'use strict'

const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const exerciseContentSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  },

  lang: {
    type: mongoose.Schema.Types.ObjectId,
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

exerciseContentSchema.plugin(timestamp)

module.exports = mongoose.model('ExerciseContent', exerciseContentSchema)
