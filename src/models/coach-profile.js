const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

//TODO handle language ?
const coachProfileSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  description: {
    type: String
  },

  company: {
    type: String
  },

  sports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
  }]


})

coachProfileSchema.plugin(timestamp)

module.exports = mongoose.model('Coach Profile', coachProfileSchema)
