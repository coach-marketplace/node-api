'use strict'

/**
 * Languages will respect ISO-939
 *
 * https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 */

const mongoose = require('mongoose')

const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const langSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  /**
   * ISO Language name
   * e.g. => 'English'
   */
  name: {
    type: String,
    required: true,
    trim: true,
  },

  /**
   * ISO 639-2
   */
  ISO_639_2: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  /**
   * ISO 639-3
   */
  ISO_639_3: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
})

langSchema.plugin(timestamp)

module.exports = mongoose.model('Lang', langSchema)
