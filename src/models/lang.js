'use strict'

/**
 * Languages will respect ISO-639
 *
 * https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 */

const mongoose = require('mongoose')

const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const langSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  /**
   * ISO Language name (english)
   * e.g. => 'English', 'French'
   */
  name: {
    type: String,
    required: true,
    trim: true,
  },

  /**
   * Native Language name
   * e.g. => 'English', 'Français'
   */
  originalName: {
    type: String,
    required: true,
    trim: true,
  },

  /**
   * ISO 639-1
   * e.g. => 'en', 'fr'
   */
  ISO_639_1: {
    type: String,
    required: true,
    trim: true,
  },

  /**
   * ISO 639-2
   * e.g. => 'eng', 'fra'
   */
  ISO_639_2: {
    type: String,
    required: true,
    trim: true,
  },
})

langSchema.plugin(timestamp)

module.exports = mongoose.model('Lang', langSchema)
