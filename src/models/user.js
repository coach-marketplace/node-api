'use strict'

const { LOCALE, LOCALES, USER_ACCOUNT_TYPES } = require('../_utils/constants')

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

  dateOfBirth: {
    type: Date,
  },

  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'not-say'],
  },

  lang: {
    type: String,
    default: LOCALE.EN_US,
    enum: LOCALES,
    required: true,
  },

  isArchived: {
    type: Boolean,
    default: false,
  },

  isCoach: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  emailConfirmedAt: {
    type: Date,
    default: null,
  },

  emailToken: {
    type: String,
  },

  /**
   * If user have a socket
   */
  onlineSocketId: {
    type: String,
    default: null,
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
    },
  ],
})

userSchema.plugin(timestamp)

module.exports = mongoose.model('User', userSchema)
