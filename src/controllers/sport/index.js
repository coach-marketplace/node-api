'use strict'

const {
  getSports,
  addSport,
  getSportById,
  getSportByName,
  updateSport,
  deleteSport,
} = require('./queries.js')

module.exports = {
  /**
   * Create a sport
   */
  addSport: async (req, res) => {
    try {
      const name = req.body
      const newSportData = { name }
      const newSport = await addSport(newSportData)
      res.status(201).json(newSport)
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot add new sport',
        debug_message: error.message,
      })
    }
  },

  /**
   * Get all sports
   */
  getSports: async (_req, res) => {
    try {
      const response = await getSports()
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({
        public_message: 'No sports',
        debug_message: error.message,
      })
    }
  },

  /**
   * Get one sport by id
   */
  getSportById: async (req, res) => {
    try {
      const sportId = req.params.id
      const sport = (await getSportById(sportId))[0]
      res.status(200).json(sport)
    } catch (error) {
      res.status(500).json({
        public_message: 'Sport not found',
        debug_message: error.message,
      })
    }
  },

  /**
   * Get one sport by name
   */
  getSportByName: async (req, res) => {
    try {
      const name = req.params.name
      const sport = (await getSportByName(name))[0]
      res.status(200).json(sport)
    } catch (error) {
      res.status(500).json({
        public_message: 'Sport not found',
        debug_message: error.message,
      })
    }
  },

  /**
   * Update one sport
   */
  updateSport: async (req, res) => {
    try {
      const { name } = req.body
      const { id } = req.params
      const updatedData = { id, name }
      const newSport = await updateSport(id, updatedData)
      res.status(200).json(newSport)
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot update the sport',
        debug_message: error.message,
      })
    }
  },

  /**
   * Delete one sport
   */
  deleteSport: async (req, res) => {
    try {
      const { id } = req.params
      await deleteSport(id)
      res.status(200).json({ message: 'Sport deleted' })
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot delete the sport',
        debug_message: error.message,
      })
    }
  },
}
