/* eslint-disable no-undef */
'use strict'

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

// const hydrate = require('./hydration')

module.exports = {
  connect: () => {
    return (
      mongoose
        .connect('mongodb://localhost:27017/Fitigai', {
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
