/* eslint-disable no-undef */
'use strict'

const mongoose = require('mongoose')

// TODO: create the hydration to separate into files
// const currencies = [
//   {
//     name: 'EUR',
//     label: 'EURO',
//     symbol: '€',
//   },
//   {
//     name: 'USD',
//     label: 'UNITED STATES DOLLAR',
//     symbol: '$',
//   },
// ]

// const queries = currencies.map(curr => ({
//   updateOne: {
//     filter: {
//       name: curr.name,
//     },
//     update: {
//       $set: curr,
//     },
//     upsert: true,
//   },
// }))

module.exports = {
  connect: () => {
    return mongoose
      .connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(async () => {
        // await mongoose.model('Currency').bulkWrite(queries, { ordered: true })
        console.log('Database connected!')
      })
      .catch((error) => {
        console.log('Database connection error:', error.message)
      })
  },
  close: () => mongoose.disconnect(),
}
