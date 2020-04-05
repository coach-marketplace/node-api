'use strict'

const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  /**
   * The user responsible of this exercise
   */
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // TODO: add an organization owner

  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
  },

  isArchived: {
    type: Boolean,
    default: false,
  },

  isPrivate: {
    type: Boolean,
    default: false,
  },
})

exerciseSchema.plugin(timestamp)

module.exports = mongoose.model('Exercise', exerciseSchema)
