'use strict'

const axios = require('axios')

/**
 * https://docs.mongodb.com/manual/geospatial-queries/
 *
 * https://nominatim.org/release-docs/develop/api/Search/
 */

module.exports = {
  getLocation: async query => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search/q=${query}?format=json`,
    )

    return response.data
  },
}
