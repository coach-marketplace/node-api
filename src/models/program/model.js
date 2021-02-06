'use strict'

const mongoose = require('mongoose')

const { programSchema } = require('./schema')

module.exports = mongoose.model('Program', programSchema)
