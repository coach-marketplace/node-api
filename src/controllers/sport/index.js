'use strict'

const { getAllSports, createSport, getSportById } = require('./handlers')
const { getLangByISO } = require('../lang/handlers')
const { LANG } = require('../../_utils/constants')

module.exports = {
  retrieveSports: async (req, res) => {
    try {
      const services = await getAllSports()

      res.status(200).json(services)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all sports',
        debug_message: error.message,
      })
    }
  },

  retrieveSport: async (req, res) => {
    const {
      params: { id },
    } = req
    try {
      const sport = await getSportById(id)

      res.status(200).json(sport)
    } catch (error) {
      res.status(500).json({
        public_message: `Error in getting sport (id: ${id})`,
        debug_message: error.message,
      })
    }
  },

  createSport: async (req, res) => {
    try {
      const { name, lang } = req.body

      if (!name || !lang) {
        throw new Error('Incomplete data')
      }

      const acceptedLanguagesValue = Object.keys(LANG).map((k) =>
        LANG[k].NAME.toLowerCase(),
      )

      if (!acceptedLanguagesValue.includes(lang)) {
        throw new Error('Lang is invalid')
      }

      const language = await getLangByISO(lang)
      const newSport = await createSport({
        name,
        langId: language._id,
      })

      res.status(201).json(newSport)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in sport creation',
        debug_message: error.message,
      })
    }
  },
}
