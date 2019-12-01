/* eslint-disable no-undef */
'use strict'

const app = require('./app')
const database = require('./database')
const { PORT } = process.env

database.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server in running on http://localhost:${PORT}/`)
  })
})
