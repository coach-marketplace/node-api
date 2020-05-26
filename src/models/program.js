const mongoose = require('mongoose')
const Schema = mongoose.Schema

const programContentSchema = require('../schemas/programContent')
const programWorkoutSchema = require('../schemas/programWorkout')

const programSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  /**
   * The user responsible of this program
   * (could be a organization in the future)
   */
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
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

  content: [programContentSchema],

  workouts: [programWorkoutSchema],
})

module.exports = mongoose.model('Program', programSchema)
