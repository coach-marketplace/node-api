'use strict'

const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const exerciseContentSchema = require('../schemas/exerciseContent')

const exerciseSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  /**
   * The user responsible of this exercise
   * (could be a organization in the future)
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

  /**
   * Translatable content:
   * The content who can be written into different languages
   */
  content: [exerciseContentSchema],
})

exerciseSchema.plugin(timestamp)

module.exports = mongoose.model('Exercise', exerciseSchema)
