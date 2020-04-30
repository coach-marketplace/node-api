const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const { UNIT, WEIGHTS } = require('../_utils/constants')

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
      enum: [UNIT.DISTANCE.CM, UNIT.DISTANCE.IN],
    },
  },

  weight: {
    value: Number,
    unit: {
      type: String,
      enum: WEIGHTS,
    },
  },
})

physicalMetricsSchema.plugin(timestamp)

module.exports = mongoose.model('Physical Metrics', physicalMetricsSchema)
