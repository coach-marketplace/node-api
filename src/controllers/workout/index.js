'use strict'

// const {
//   getAllExercises,
//   createExercise,
//   getExerciseById,
// } = require('./handlers')
// const { getUserById } = require('../user/handlers')
// const { LOCALES } = require('../../_utils/constants')

exports.getAll = async (req, res) => {
  try {
    // const exercises = await getAllExercises()

    res.status(200).json({})
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
    // const sport = await getExerciseById(id)

    res.status(200).json({})
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
      sportId,
      userOwnerId,
      videoUrl,
    } = req.body
    if (!lang) throw new Error('Lang is required')

    if (!userOwnerId) throw new Error('userOwnerId is required')

    // if (!LOCALES.includes(lang)) throw new Error('Lang is invalid')

    // const userOwner = await getUserById(userOwnerId)
    // const newExercise = await createExercise(
    //   userOwner._id.toString(),
    //   lang,
    //   name,
    //   sportId,
    //   instructions,
    //   videoUrl,
    //   isPrivate,
    //   isTemplate,
    // )

    res.status(201).json({})
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in exercise creation',
      debug_message: error.message,
    })
  }
}
