'use strict'

const PARTICIPANT_TYPE = ['owner', 'member']

const Schema = require('mongoose').Schema

const conversationParticipantSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(PARTICIPANT_TYPE),
    require: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  lastSeen: {
    type: Date,
    require: true,
  },
})

module.exports = conversationParticipantSchema
