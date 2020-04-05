'use strict'

const { read } = require('./queries')

module.exports = {
  retrieveLangs: async (req, res) => {
    try {
      const langs = await read()

      res.status(209).json(langs)
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

      res.status(200).json(lang)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting lang',
        debug_message: error.message,
      })
    }
  },
}
