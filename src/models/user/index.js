'use strict'

const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
})

userSchema.plugin(timestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

module.exports = mongoose.model('User', userSchema)
