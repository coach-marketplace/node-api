'use strict'

const mongoose = require('mongoose')

const { exerciseSchema } = require('./schema')

module.exports = mongoose.model('Exercise', exerciseSchema)
