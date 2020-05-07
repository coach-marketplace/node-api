'use strict'

const mongoose = require('mongoose')
const Assignment = require('../../models/assignment')
const AssignedWorkout = require('../../models/assignment-workout')

const createAssignmentQuery = async (data) => {
  if (!data._id) data._id = new mongoose.Types.ObjectId()
  let assignment = new Assignment(data)
  return assignment.save()
}

const createAssignedWorkoutQuery = async (data) => {
  if (!data._id) data._id = new mongoose.Types.ObjectId()
  let assignedWorkout = new AssignedWorkout(data)
  return assignedWorkout.save()
}

module.exports = {
  createAssignmentQuery,
  createAssignedWorkoutQuery,
}
