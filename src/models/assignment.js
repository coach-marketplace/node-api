'use strict'

const mongoose = require('mongoose')

const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const assignmentSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true,
  },

  trainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  startDate: {
    type: Date,
  },
})

assignmentSchema.plugin(timestamp)

module.exports = mongoose.model('Assignment', assignmentSchema)
