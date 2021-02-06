'use strict'

const mongoose = require('mongoose')

const { workoutSchema } = require('./schema')

module.exports = mongoose.model('Workout', workoutSchema)
