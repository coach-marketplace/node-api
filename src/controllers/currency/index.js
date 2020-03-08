'use strict'

const { read, create } = require('./queries')

module.exports = {
  createCurrency: async (req, res) => {
    try {
      const { name, label } = req.body

      if (!name || !label) {
        throw new Error('Name and Label are required')
      }

      const newOffer = await create({ name, label })

      res.status(201).json(newOffer)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in currency creation',
        debug_message: error.message,
      })
    }
  },

  retrieveCurrencies: async (req, res) => {
    try {
      const currencies = await read()

      res.status(201).json(currencies)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all currencies',
        debug_message: error.message,
      })
    }
  },

  retrieveCurrency: async (req, res) => {
    try {
      const {
        params: { id },
      } = req

      const currency = (await read({ _id: id }))[0]

      res.status(201).json(currency)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting currency',
        debug_message: error.message,
      })
    }
  },
}
