const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assignmentContentSchema = require('../schemas/assignmentContent')

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

  content: [assignmentContentSchema],


  startDate: Date,

  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssignedWorkouts',
    required: true,
  }],
})

module.exports = mongoose.model('Assignement', assignmentSchema)
