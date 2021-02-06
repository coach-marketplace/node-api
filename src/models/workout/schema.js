'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { exerciseSchema } = require('../exercise/schema')

const {
  DISTANCES,
  LOCALE,
  LOCALES,
  OTHERS_UNITS,
  TIMES,
  WEIGHTS,
} = require('../../_utils/constants')

const workoutContentSchema = new Schema({
  lang: {
    type: String,
    default: LOCALE.EN_US,
    enum: LOCALES,
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  instructions: {
    type: String,
  },
})

const workoutSchema = new Schema({
  _id: Schema.Types.ObjectId,

  /**
   * The user responsible of this workout
   * (could be a organization in the future)
   */
  userOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  isArchived: {
    type: Boolean,
    default: false,
  },

  isPrivate: {
    type: Boolean,
    default: false,
  },

  /**
   * Translatable content:
   * The content who can be written into different languages
   */
  content: [workoutContentSchema],

  exercises: [
    {
      exercise: exerciseSchema,
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

      /**
       * Set help to group exercises together
       *
       * eg: All exercises in a set are into a group
       */
      set: {
        type: Number,
        default: 1,
      },
    },
  ],
})

module.exports = mongoose.model('Workout', workoutSchema)
