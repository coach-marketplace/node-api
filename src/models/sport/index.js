'use strict'

const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const sportSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
})

sportSchema.plugin(timestamp)

module.exports = mongoose.model('Sport', sportSchema)
