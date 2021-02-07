'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { getUserById } = require('../user/handlers')
const { LOCALES } = require('../../_utils/constants')
const Exercise = require('../../models/exercise')

exports.getAll = async (req, res) => {
  try {
    const exercises = await Exercise.find()

    res.status(200).json(exercises)
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
    const sport = await Exercise.find({ _id: id }).lean()

    res.status(200).json(sport)
  } catch (error) {
    res.status(500).json({
      public_message: `Error in getting exercise (id: ${id})`,
      debug_message: error.message,
    })
  }
}

exports.create = async (req, res) => {
  try {
    const {
      instructions,
      isPrivate,
      isTemplate,
      lang,
      name,
      sport,
      userOwnerId,
      videoUrl,
    } = req.body
    if (!lang) throw new Error('Lang is required')
    if (!LOCALES.includes(lang)) throw new Error('Lang is invalid')

    let userOwner
    if (userOwnerId) {
      userOwner = await getUserById(userOwnerId)
    }
    const newExercise = await new Exercise({
      _id: new ObjectId(),
      userOwner: userOwner ? new ObjectId(userOwnerId) : undefined,
      isArchived: false,
      isPrivate: userOwner ? isPrivate : false,
      isTemplate: userOwner ? isTemplate : true,
      content: [
        {
          lang,
          name,
          instructions,
          videoUrl,
          sport,
        },
      ],
    }).save()

    res.status(201).json(newExercise)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in exercise creation',
      debug_message: error.message,
    })
  }
}
