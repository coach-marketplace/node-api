'use strict'

const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const { LOCALE, LOCALES } = require('../../_utils/constants')

const exerciseContentSchema = new Schema({
  lang: {
    type: String,
    default: LOCALE.EN_US,
    enum: LOCALES,
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

  sport: {
    type: String,
  },
})

exports.exerciseContentSchema = exerciseContentSchema

const exerciseSchema = new Schema({
  _id: Schema.Types.ObjectId,

  /**
   * The user responsible of this exercise
   * (could be a organization in the future)
   */
  userOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  // TODO: add an organization owner

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

exports.exerciseSchema = exerciseSchema
