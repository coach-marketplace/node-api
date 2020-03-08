'use strict'

const { pick } = require('lodash')

const { encryptString } = require('../../_utils/hashing')
const { create, read, editUser } = require('../user/queries.js')
const { USER_ACCOUNT_TYPE } = require('../../_utils/constants')

module.exports = {
  registerLocal: async (req, res) => {
    try {
      const {
        body: { email, first_name, last_name, password },
      } = req
      if (!email || !password) {
        throw new Error('Email and Password are required')
      }
      let user = (await read({ email }, { withPassword: true }))[0]

      if (user) {
        if (
          user.accounts &&
          user.accounts.find(({ type }) => type === USER_ACCOUNT_TYPE.LOCAL)
        ) {
          throw new Error('User already have a local account')
        }
        first_name && (user.first_name = first_name)
        last_name && (user.last_name = last_name)
        const newLocalAccount = {
          type: USER_ACCOUNT_TYPE.LOCAL,
          password: await encryptString(password),
        }
        if (!user.accounts) {
          user.accounts = []
        }
        user.accounts.push(newLocalAccount)
        user = await editUser(user._id, user)
      } else {
        user = await create({
          email,
          first_name,
          last_name,
          password: await encryptString(password),
        })
      }

      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error while trying to sign up',
        debug_message: error.message,
      })
    }
  },

  login: async (req, res) => {
    res.status(201).json(req.user)
  },

  getMe: async (req, res) => {
    try {
      res.status(201).json({
        ...pick(req.user, ['email', 'first_name', 'last_name', '_id']),
      })
    } catch (error) {
      res.status(500).json({
        public_message: 'Unauthorized',
        debug_message: error.message,
      })
    }
  },
}
