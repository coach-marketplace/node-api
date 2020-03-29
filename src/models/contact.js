'use strict'

const { CONTACT_TYPES } = require('../_utils/constants')

/**
 * Contact represent a lead for a coach
 * Every user can have many contacts so it's
 * an N to N relation
 */

const mongoose = require('mongoose')

const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const contactSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  /**
   * Owner is the user who have the contact
   */
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  /**
   * Lead is the contact that the owner has
   */
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  /**
   * Type is the type of relation
   * for the moment we have only `trainee`
   */
  type: {
    type: String,
    enum: CONTACT_TYPES,
  },
})

contactSchema.plugin(timestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

module.exports = mongoose.model('Contact', contactSchema)
