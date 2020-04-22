'use strict'

/**
 * Conversation is a channel between users where they can post messages into
 */

const mongoose = require('mongoose')

const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  isArchived: {
    type: Boolean,
    default: false,
  },
})

messageSchema.plugin(timestamp)

module.exports = mongoose.model('Message', messageSchema)
