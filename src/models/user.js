'use strict'

const { USER_ACCOUNT_TYPES } = require('../_utils/constants')

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *        properties:
 *          _id:
 *            type: objectId
 *          createdAt:
 *            type: timestamp
 *          updatedAt:
 *            type: timestamp
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          accounts:
 *            type: array
 *        example:
 *           email: john.doe@email.com
 *           firstName: John
 *           lastName: Doe
 */

const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema;


const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  firstName: {
    type: String,
    trim: true,
  },

  lastName: {
    type: String,
    trim: true,
  },

  phone: {
    type: String,
    trim: true,
  },

  isArchived: {
    type: Boolean,
    default: false,
  },

  isCoach: {
    type: Boolean,
    default: false,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  emailConfirmedAt: {
    type: String,
    default: null,
  },

  emailToken: {
    type: String,
  },

  /**
   * Account is optional, and if you have one, you can have many possibilities
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

      body: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Body'
      }
    },
  ],
})

userSchema.plugin(timestamp)

userSchema.methods = {
  getLightData() {
    return {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      accounts: this.accounts,
    }
  },
}

module.exports = mongoose.model('User', userSchema)
