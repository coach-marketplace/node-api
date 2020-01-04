'use strict'

/**
 * @swagger
 *  components:
 *    schemas:
 *      Sport:
 *        type: object
 *        required:
 *          - _id
 *          - name
 *        properties:
 *          _id:
 *            name:
 *            type: string
 *        example:
 *           name: Tennis
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sportSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
})

module.exports = mongoose.model('Sport', sportSchema)
