'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  first_name: String,
  last_name: String,
  password: String,
})

module.exports = mongoose.model('User', userSchema)
