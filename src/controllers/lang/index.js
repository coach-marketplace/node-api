'use strict'

const { read, create } = require('./queries')

module.exports = {
  createLang: async (req, res) => {
    try {
      const { name, ISO_639_2, ISO_639_3 } = req.body

      if (!name || !ISO_639_2 || !ISO_639_3) {
        throw new Error('Field is missing')
      }

      const newLang = await create({ name, ISO_639_2, ISO_639_3 })

      res.status(201).json(newLang)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in lang creation',
        debug_message: error.message,
      })
    }
  },

  retrieveLangs: async (req, res) => {
    try {
      const langs = await read()

      res.status(201).json(langs)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all langs',
        debug_message: error.message,
      })
    }
  },

  retrieveLang: async (req, res) => {
    try {
      const {
        params: { id },
      } = req

      const lang = (await read({ _id: id }))[0]

      res.status(201).json(lang)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting lang',
        debug_message: error.message,
      })
    }
  },
}
