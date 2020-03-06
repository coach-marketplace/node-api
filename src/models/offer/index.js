'use strict'

const mongoose = require('mongoose')

const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const offerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
});

offerSchema.plugin(timestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

offerSchema.index({"title":"text", "description":"text"});

module.exports = mongoose.model('Offer', offerSchema)