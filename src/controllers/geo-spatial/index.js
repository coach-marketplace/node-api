'use strict'

const { getGeoLocByAddress } = require('./handlers')

module.exports = {
  retrieveLocation: async (req, res) => {
    try {
      const { address } = req.body

      if (!address) {
        throw new Error('Address is required')
      }

      const response = await getGeoLocByAddress(address)

      res.status(201).json(response)
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot get coordinates location',
        debug_message: error.message,
      })
    }
  },
}
