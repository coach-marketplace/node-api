// TODO: hydrate DB with data that we think are relevant like exercises,...

// const Lang = require('../models/lang')

// const data = require('./data')

// const languageQueries = data.languages.map((data) => ({
//   updateOne: {
//     filter: {
//       name: data.name,
//     },
//     update: {
//       $set: data,
//     },
//     upsert: true,
//   },
// }))

const hydrate = async () => {
  // await Lang.bulkWrite(languageQueries, { ordered: true })
}

module.exports = hydrate
