'use strict'

const mongoose = require('mongoose')
const { retrieveProgramById } = require('../program/handlers')
const { createWorkout } = require('../workout/handlers')
const { RATING } = require('../../_utils/constants')
const {
  createAssignedWorkoutQuery,
  createAssignmentQuery,
} = require('./queries')

const createAssignmentHandler = async (
  coachId,
  trainees,
  workouts,
  title,
  description,
  language,
  startDate,
) => {
  if (!coachId) throw Error('No coach id')
  if (!trainees || !trainees.length) throw Error('no trainess')
  if (!workouts || !workouts.length) throw Error('no workouts')

  let assignmentId = new mongoose.Types.ObjectId()

  let assignedWorkouts = await createAssignmentWorkoutListHandler(
    coachId,
    trainees,
    workouts,
    startDate,
    assignmentId,
    language,
  )
  let assignmentData = {
    _id: assignmentId,
    coach: coachId,
    trainees: trainees,
    content: [
      {
        lang: language,
        title: title,
        description: description,
      },
    ],
    startDate: startDate,
    workouts: assignedWorkouts,
  }

  return await createAssignmentQuery(assignmentData)
}

const createAssignmentWorkoutListHandler = async (
  coachId,
  trainees,
  workouts,
  startDate,
  assignmentId,
  language,
) => {
  let assignedWorkoutsList = []
  for (let workout of workouts) {
    switch (workout.type.toLowerCase()) {
      case 'program':
        for (let traineeId of trainees) {
          let assignedWorkouts = await createAssignmentWorkoutsFromProgramHanlder(
            coachId,
            traineeId,
            workout.program,
            startDate,
            assignmentId,
          )
          assignedWorkoutsList = assignedWorkoutsList.concat(assignedWorkouts)
        }
        break
      case 'workout':
        for (let traineeId of trainees) {
          let assignedWorkout = await createAssignmentWorkoutsFromWorkoutHanlder(
            coachId,
            traineeId,
            workout.workout,
            workout.date,
            assignmentId,
          )
          assignedWorkoutsList.push(assignedWorkout)
        }
        break
      case 'exercise':
        for (let traineeId of trainees) {
          let assignedWorkout = await createAssignmentWorkoutsFromExerciseHanlder(
            coachId,
            traineeId,
            workout.exercise,
            workout.quantity,
            workout.weight,
            workout.date,
            assignmentId,
            language,
          )
          assignedWorkoutsList.push(assignedWorkout)
        }
        break
    }
  }

  return assignedWorkoutsList
}

const createAssignmentWorkoutsFromProgramHanlder = async (
  coachId,
  traineeId,
  programId,
  startDate,
  assignmentId,
) => {
  let assignedWorkouts = []
  let program = await retrieveProgramById(programId)
  for (let workout of program.workouts) {
    let date = new Date(startDate)
    date.setDate(date.getDate() + (workout.day - 1)) //as first day is 1 in program
    let minutes = workout.startTime % 60
    date.setHours((workout.startTime - minutes) / 60)
    date.setMinutes(minutes)
    let awk = await createAssignedWorkoutQuery({
      assignment: assignmentId,
      trainee: traineeId,
      coach: coachId,
      workout: workout.workout,
      date: date,
      state: RATING.todo,
    })
    assignedWorkouts.push(awk)
  }
  return assignedWorkouts
}

const createAssignmentWorkoutsFromWorkoutHanlder = async (
  coachId,
  traineeId,
  workoutId,
  date,
  assignmentId,
) => {
  let awk = await createAssignedWorkoutQuery({
    assignment: assignmentId,
    trainee: traineeId,
    coach: coachId,
    workout: workoutId,
    date: date,
    state: RATING.todo,
  })
  return awk
}

//TODO: how do properly handle the workout created with the exercise ?
const createAssignmentWorkoutsFromExerciseHanlder = async (
  coachId,
  traineeId,
  exerciseId,
  quantity,
  weight,
  date,
  assignmentId,
  language,
) => {
  console.log(exerciseId)
  let workout = await createWorkout(
    coachId,
    language,
    'test',
    null,
    [{ exercise: exerciseId, quantity: quantity, weight: weight }],
    false,
    true,
  )
  let awk = await createAssignedWorkoutQuery({
    assignment: assignmentId,
    trainee: traineeId,
    coach: coachId,
    workout: workout._id,
    date: date,
    state: RATING.todo,
  })

  return awk
}

module.exports = {
  createAssignmentHandler,
}
