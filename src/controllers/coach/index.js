'use strict'

const {
  addCoach,
  getCoaches,
  getCoachById,
  editCoach,
  removeCoachById,
} = require('./queries.js')

module.exports = {
  /**
   * Create a coach
   */
  createCoach: async (req, res) => {
    try {
      const { userId, description, displayName } = req.body
      const newCoachData = { user: userId }
      description && (newCoachData.description = description)
      displayName && (newCoachData.displayName = displayName)
      const newCoach = await addCoach(newCoachData)
      res.status(201).json(newCoach)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in coach creation',
        debug_message: error.message,
      })
    }
  },
  /**
   * Get all coaches
   */
  readCoaches: async (_req, res) => {
    try {
      const response = await getCoaches()
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in get coaches',
        debug_message: error.message,
      })
    }
  },
  /**
   * Get one coach
   */
  readCoach: async (req, res) => {
    try {
      const { id } = req.params
      const coach = (await getCoachById(id))[0]
      res.status(200).json(coach)
    } catch (error) {
      res.status(500).json({
        public_message: 'Coach not found',
        debug_message: error.message,
      })
    }
  },
  /**
   * Update one coach
   */
  updateCoach: async (req, res) => {
    try {
      const { id } = req.params
      const { userId, description, displayName } = req.body
      const updatedData = {}
      userId && (updatedData.user = userId)
      description && (updatedData.description = description)
      displayName && (updatedData.display_name = displayName)
      const newCoach = await editCoach(id, updatedData)
      res.status(200).json(newCoach)
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot update the coach',
        debug_message: error.message,
      })
    }
  },
  /**
   * Delete one coach
   */
  deleteCoach: async (req, res) => {
    try {
      const { id } = req.params
      await removeCoachById(id)
      res.status(200).json({ message: 'Coach deleted' })
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot delete the coach',
        debug_message: error.message,
      })
    }
  },
}
