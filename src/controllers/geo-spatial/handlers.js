'use strict'

const { getLocation } = require('./queries')

module.exports = {
  getGeoLocByAddress: async (address) => {
    const response = await getLocation(address)

    return response
  },
}
