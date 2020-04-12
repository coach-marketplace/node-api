'use strict'

const axios = require('axios')

/**
 * https://docs.mongodb.com/manual/geospatial-queries/
 *
 * https://nominatim.org/release-docs/develop/api/Search/
 */

module.exports = {
  getLocation: async (query) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search/q=${query}?format=json`,
      )

      return response.data
    } catch (error) {
      // eslint-disable-next-line no-undef
      log('Error', { color: 'red' })
      // eslint-disable-next-line no-undef
      log(error.message)

      return []
    }
  },
}
