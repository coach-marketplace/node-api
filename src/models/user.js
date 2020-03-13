'use strict'

// eslint-disable-next-line no-undef
const { JWT_SECRET } = process.env
const { USER_ACCOUNT_TYPES } = require('../_utils/constants')

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - _id
 *          - email
 *        properties:
 *          _id:
 *            type: objectId
 *          created_at:
 *            type: timestamp
 *          updated_at:
 *            type: timestamp
 *          first_name:
 *            type: string
 *          last_name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           first_name: John
 *           last_name: Doe
 *           email: john.doe@email.com
 */

const jwt = require('jsonwebtoken')
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

  phone: {
    type: String,
    trim: true,
  },

  /**
   * Account is optionnal, and if you have one, you can have many possibilities
   * like `local`which is the normal `email` + `password` authentication way.
   * You also can have a google account then in that cas you get an id and
   * an avatar
   */
  accounts: [
    {
      type: {
        type: String,
        enum: USER_ACCOUNT_TYPES,
      },

      /**
       * Generally the google id (if `google` type)
       */
      id: {
        type: String,
      },

      /**
       * Only if type is `local`
       */
      password: {
        type: String,
      },

      avatar: {
        type: String,
        trim: true,
      },
    },
  ],
})

userSchema.plugin(timestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

userSchema.methods = {
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
      },
    )
  },
  getSoftData() {
    return {
      _id: this._id,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      token: `Bearer ${this.createToken()}`,
    }
  },
}

module.exports = mongoose.model('User', userSchema)
