const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutContentSchema = require('../schemas/workoutContent')
const workoutExerciseSchema = require('../schemas/workoutExercise')

const workoutSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  /**
   * The user responsible of this workout
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

  /**
   * Translatable content:
   * The content who can be written into different languages
   */
  content: [workoutContentSchema],

  exercises: [workoutExerciseSchema],
})

module.exports = mongoose.model('Workout', workoutSchema)
