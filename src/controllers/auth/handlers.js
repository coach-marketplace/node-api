'use strict'

const { encryptString, compareHash } = require('../../_utils/hashing')
const { read, create } = require('../user/queries')
const { USER_ACCOUNT_TYPE } = require('../../_utils/constants')

const getUserLightData = (user) => ({
  _id: user._id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  isArchived: user.isArchived,
  isCoach: user.isCoach,
  isAdmin: user.isAdmin,
})

module.exports = {
  /**
   * Log
   *
   * @param {string} email Email of the user
   * @param {string} password Password of the user
   *
   * @returns {object} The logged user
   */
  log: async (email, password) => {
    const user = (await read({ email }, { withPassword: true }))[0]

    if (!user || (!user.accounts && !user.accounts.length)) {
      throw new Error("This account doesn't exist")
    }

    const localAccount = user.accounts.find(
      ({ type }) => type === USER_ACCOUNT_TYPE.LOCAL,
    )

    if (!user.accounts && !user.accounts.length && !localAccount) {
      throw new Error('Email or password incorrect')
    }

    const isMatch = await compareHash(password, localAccount.password)

    if (!isMatch) {
      throw new Error('Email or password incorrect')
    }

    return getUserLightData(user)
  },

  register: async (data) => {
    const { email, password, firstName, lastName, phone } = data

    if (!email || !password) {
      throw new Error('Email and Password are required')
    }

    const users = await read({ email })

    if (users.length) {
      throw new Error('Email already used')
    }

    const user = await create({
      email,
      firstName,
      lastName,
      phone,
      accounts: [
        {
          type: USER_ACCOUNT_TYPE.LOCAL,
          password: await encryptString(password),
        },
      ],
    })

    return getUserLightData(user)
  },
}
