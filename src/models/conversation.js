'use strict'

/**
 * Conversation is a channel between users where they can post messages into
 */

const mongoose = require('mongoose')

const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const conversationParticipantSchema = require('../schemas/conversationParticipant')

const conversationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  participants: [conversationParticipantSchema],
})

conversationSchema.plugin(timestamp)

module.exports = mongoose.model('Conversation', conversationSchema)
