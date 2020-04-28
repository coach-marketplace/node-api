'use strict'

const {
  WEIGHTS,
  DISTANCES,
  TIMES,
  OTHERS_UNITS,
} = require('../_utils/constants')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  /**
   * The workout where the exercise belong
   */
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true,
  },

  /**
   * The exercise id
   */
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  },

  /**
   * Number (could be minutes, seconds, reps,...)
   */
  number: {
    type: Number,
    min: 1,
    default: null,
    /**
     * The unit will explain what the number is for
     * e.g. 300 (squats) | 300m (RUN) | 10rep (Jumping jack)
     */
    unit: {
      type: String,
      enum: [...DISTANCES, ...TIMES, ...OTHERS_UNITS], // cm, m, sec, min, rep,...
      default: null,
    },
  },

  /**
   * e.g. 10 reps of squat at 40kg
   */
  weight: {
    type: Number,
    min: 0,
    default: null,
    unit: {
      type: String,
      enum: [WEIGHTS], // kg, lbs
    },
  },
})

module.exports = mongoose.model('WorkoutExercise', workoutSchema)
