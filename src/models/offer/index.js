'use strict'

const mongoose = require('mongoose')

const Coach = require('../coach'),
      coachSchema = mongoose.model('Coach').schema;


const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const offerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
})

offerSchema.plugin(timestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

module.exports = mongoose.model('Offer', offerSchema)
