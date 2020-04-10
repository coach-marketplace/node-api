'use strict'

const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const sportContentSchema = require('../schemas/sportContent')

const sportSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  content: [sportContentSchema],
})

sportSchema.plugin(timestamp)

module.exports = mongoose.model('Sport', sportSchema)
