const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutContentSchema = require('../schemas/workoutContent')
const workoutExerciseSchema = require('../schemas/workoutExercise')

const assignmentSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  /**
   * The user responsible of this workout
   * (could be a organization in the future)
   */
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  trainees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],

  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program', //SHould be an assigned program
    required: true,
  },

  startDate: Date,
})

module.exports = mongoose.model('Workout', workoutSchema)
