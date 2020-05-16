'use strict'

const {
  getAllExercises,
  createExercise,
  getExerciseById,
} = require('./handlers')
const { getUserById } = require('../user/handlers')
const { LOCALES } = require('../../_utils/constants')

module.exports = {
  retrieveExercises: async (req, res) => {
    try {
      const exercises = await getAllExercises()

      res.status(200).json(exercises)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all exercises',
        debug_message: error.message,
      })
    }
  },

  retrieveExercise: async (req, res) => {
    const {
      params: { id },
    } = req
    try {
      const sport = await getExerciseById(id)

      res.status(200).json(sport)
    } catch (error) {
      res.status(500).json({
        public_message: `Error in getting exercise (id: ${id})`,
        debug_message: error.message,
      })
    }
  },

  createExercise: async (req, res) => {
    try {
      const {
        instructions,
        isPrivate,
        lang,
        name,
        sportId,
        userOwnerId,
        videoUrl,
      } = req.body
      if (!lang) throw new Error('Lang is required')

      if (!userOwnerId) throw new Error('userOwnerId is required')

      if (!LOCALES.includes(lang)) throw new Error('Lang is invalid')

      const userOwner = await getUserById(userOwnerId)
      const newExercise = await createExercise(
        userOwner._id.toString(),
        lang,
        name,
        sportId,
        instructions,
        videoUrl,
        isPrivate,
      )

      res.status(201).json(newExercise)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in exercise creation',
        debug_message: error.message,
      })
    }
  },
}
