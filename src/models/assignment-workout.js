'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { STATES, RATINGS } = require('../_utils/constants')

const assignedWorkout = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },

  trainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true,
  },

  date: Date,

  state: {
    type: String,
    enum: STATES,
  },

  rating: {
    type: String,
    enum: RATINGS,
  },
})

module.exports = mongoose.model('AssignedWorkout', assignedWorkout)
