'use strict'

const { getExerciseById } = require('../controllers/exercise/handlers')
const { retrieveWorkoutById } = require('../controllers/workout/handlers')
const { retrieveProgramById } = require('../controllers/program/handlers')

/**
 * hasAccessToExercise
 *
 * this middleware ensure that the auth user have access to the exercise
 * that he are requesting.
 * It assume that you are authenticated
 */
const hasAccessToExercise = async (req, res, next) => {
  const {
    user,
    params: { exerciseId },
  } = req

  if (!user) {
    res.status(401).json({ message: 'Unauthorized for un-auth user' })
    return
  }

  if (!exerciseId) {
    res.status(401).json({ message: 'Exercise id not provided' })
    return
  }

  const exercise = await getExerciseById(exerciseId)

  if (!exercise) {
    res.status(401).json({ message: 'Exercise not found' })
    return
  }

  if (
    exercise.userOwner &&
    exercise.userOwner.toString() !== user._id &&
    !user.isAdmin
  ) {
    res.status(401).json({ message: 'Unauthorized to access these data' })
    return
  }

  req.exercise = exercise

  next()
}

/**
 * hasAccessToWorkout
 *
 * this middleware ensure that the auth user have access to the workout
 * that he are requesting.
 * It assume that you are authenticated
 */
const hasAccessToWorkout = async (req, res, next) => {
  const {
    user,
    params: { workoutId },
  } = req

  if (!user) {
    res.status(401).json({ message: 'Unauthorized for un-auth user' })
    return
  }

  if (!workoutId) {
    res.status(401).json({ message: 'Workout id not provided' })
    return
  }

  const workout = await retrieveWorkoutById(workoutId)

  if (!workout) {
    res.status(401).json({ message: 'Workout not found' })
    return
  }

  if (workout.userOwner && workout.userOwner.toString() !== user._id) {
    res.status(401).json({ message: 'Unauthorized to access these data' })
    return
  }

  req.workout = workout

  next()
}

/**
 * hasAccessToProgram
 *
 * this middleware ensure that the auth user have access to the program
 * that he are requesting.
 * It assume that you are authenticated
 */
const requiredAccessToProgram = async (req, res, next) => {
  const {
    user,
    params: { programId },
  } = req

  if (!user) {
    res.status(401).json({ message: 'Unauthorized for un-auth user' })
    return
  }

  if (!programId) {
    res.status(401).json({ message: 'Program id not provided' })
    return
  }

  try {
    const program = await retrieveProgramById(programId)
    if (!program) {
      res.status(401).json({ message: 'Program not found' })
      return
    }

    if (program.userOwner && program.userOwner.toString() !== user._id) {
      res.status(401).json({ message: 'Unauthorized to access these data' })
      return
    }

    req.program = program

    next()
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Program not found', debug_message: error.message })
    return
  }
}

module.exports = {
  hasAccessToExercise,
  hasAccessToWorkout,
  requiredAccessToProgram,
}
