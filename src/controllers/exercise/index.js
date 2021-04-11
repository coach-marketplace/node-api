'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const Exercise = require('../../models/exercise')

exports.getAll = async (req, res) => {
  try {
    const exercises = await Exercise.find()
    const status = exercises.length === 0 ? 204 : 200

    res.status(status).json(exercises)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in getting all exercises',
      debug_message: error.message,
    })
  }
}

exports.getById = async (req, res) => {
  const {
    params: { id },
  } = req
  try {
    const exercise = await Exercise.find({ _id: id }).lean()
    const status = exercise.length === 0 ? 204 : 200

    res.status(status).json(exercise[0])
  } catch (error) {
    res.status(500).json({
      public_message: `Error in getting exercise (id: ${id})`,
      debug_message: error.message,
    })
  }
}

exports.create = async (req, res) => {
  try {
    const newExercise = await new Exercise({
      _id: new ObjectId(),
      ...req.body
    }).save()

    res.status(201).json(newExercise)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in exercise creation',
      debug_message: error.message,
    })
  }
}

exports.updateOne = async (req, res) => {
  try {
    const updatedExercise = await Exercise.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }, // new is use to return the document after updating
    )

    res.status(200).json(updatedExercise)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in exercise creation',
      debug_message: error.message,
    })
  }
}

exports.removeOne = async (req, res) => {
  try {
    const updatedExercise = await Exercise.deleteOne({ _id: { $eq: req.params.id } })

    res.status(200).json(updatedExercise)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in exercise creation',
      debug_message: error.message,
    })
  }
}
