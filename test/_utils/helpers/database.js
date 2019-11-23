/* eslint-disable no-undef */
'use strict'

const database = require('../../../src/database')

module.exports = {
  connectToDatabase: callback => {
    database
      .connect()
      .then(() => callback())
      .catch(error => callback(error))
  },
  disconnectToDatabase: callback => {
    database
      .close()
      .then(() => process.exit())
      .then(() => callback())
      .catch(error => callback(error))
  },
}
