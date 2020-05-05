'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const programWorkoutSchema = new Schema({
  /**
   * The workout id
   */
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true,
  },

  /**
   * The number of the day of the program
   */
  day: {
    type: Number,
    min: 1,
    default: 1,
  },

  /**
   * The start time, in minutes, will serve to define the order of the workout per day, and
   * in the future it also could be use to display the workout on a timeline if
   * needed.
   *
   * In minutes -> 3 = 00:03am | 75 -> 01:15am | 720 -> 12:00am
   */
  startTime: {
    type: Number,
    min: 0,
    max: 1439,
    default: 0,
  },
})

module.exports = programWorkoutSchema
