'use strict'

const { CONTACT_TYPE } = require('../_utils/constants')

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
    enum: Object.values(CONTACT_TYPE),
  },

  /**
   * If the coach adding a customer the customer have to accept the be coached
   * by him. Hand if the customer add a coach, the coach need to accept to be
   * his coach.
   */
  acceptedAt: {
    owner: {
      type: Date,
      default: null,
    },
    lead: {
      type: Date,
      default: null,
    },
  },
})

contactSchema.plugin(timestamp)

module.exports = mongoose.model('Contact', contactSchema)
