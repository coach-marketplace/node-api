'use strict'

const {
  WEIGHTS,
  DISTANCES,
  TIMES,
  OTHERS_UNITS,
} = require('../_utils/constants')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutExerciseSchema = new Schema({
  /**
   * The exercise id
   */
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  },

  /**
   * Quantity of... (could be minutes, seconds, reps,...)
   */
  quantity: {
    value: {
      type: Number,
      min: 1,
      default: 1,
    },
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
    value: {
      type: Number,
      default: null,
    },
    unit: {
      type: String,
      enum: WEIGHTS, // kg, lbs
    },
  },
})

module.exports = workoutExerciseSchema
