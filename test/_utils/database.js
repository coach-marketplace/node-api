/* eslint-disable no-undef */
'use strict'

const database = require('../../src/database')

const connectToDatabase = (callback) => {
  database
    .connect()
    .then(() => callback())
    .catch((error) => callback(error))
}

const disconnectToDatabase = (callback) => {
  database
    .close()
    .then(() => process.exit())
    .then(() => callback())
    .catch((error) => callback(error))
}

module.exports = {
  database,
  connectToDatabase,
  disconnectToDatabase,
}
