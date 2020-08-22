/* eslint-disable no-undef */
'use strict'

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

// const hydrate = require('./hydration')

module.exports = {
  connect: () => {
    return (
      mongoose
        .connect(process.env.MONGO_DB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        // .then(async () => {
        //   await hydrate()
        // })
        .catch((error) => {
          console.log('Database connection error:', error.message)
        })
    )
  },
  close: () => mongoose.disconnect(),
}
