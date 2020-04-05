'use strict'

const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const sportContentSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
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
})

sportContentSchema.plugin(timestamp)

module.exports = mongoose.model('SportContent', sportContentSchema)
