const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const { UNIT } = require('../_utils/constants')

const HEIGHT_UNITS = Object.values(UNIT.HEIGHT)
const WEIGHT_UNITS = Object.values(UNIT.WEIGHT)

//TODO: what about the date?

const physicalMetricsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  height: {
    value: Number,
    unit: {
      type: String,
      enum: HEIGHT_UNITS,
    },
  },

  weight: {
    value: Number,
    unit: {
      type: String,
      enum: WEIGHT_UNITS,
    },
  },
})

physicalMetricsSchema.plugin(timestamp)

module.exports = mongoose.model('Physical Metrics', physicalMetricsSchema)
