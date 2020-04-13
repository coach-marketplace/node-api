'use strict'

const Schema = require('mongoose').Schema
const timestamp = require('mongoose-timestamp')

const conversationMessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  message: {
    type: String,
  },
})

conversationMessageSchema.plugin(timestamp)

module.exports = conversationMessageSchema
