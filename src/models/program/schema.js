const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { LOCALE, LOCALES } = require('../../_utils/constants')

const programWorkoutSchema = new Schema({
  /**
   * The workout id
   */
  workout: {
    type: Schema.Types.ObjectId,
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
   * The start time, in minutes, will serve to define the order of
   * the workout per day, and in the future it also could be use to display
   * the workout on a timeline if needed.
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

const programSchema = new Schema({
  _id: Schema.Types.ObjectId,

  /**
   * The user responsible of this program
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

  days: {
    type: Number,
    min: 1,
    default: 1,
  },

  content: [
    {
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

      description: {
        type: String,
      },
    },
  ],

  workouts: [programWorkoutSchema],
})

module.exports = mongoose.model('Program', programSchema)
