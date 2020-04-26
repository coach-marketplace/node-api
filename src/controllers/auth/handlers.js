'use strict'

const { read, create } = require('../user/queries')
const { getLangByISO } = require('../lang/handlers')
const { encryptString, compareHash } = require('../../_utils/hashing')
const { USER_ACCOUNT_TYPE, LANG } = require('../../_utils/constants')

const authorizedLangs = Object.values(LANG).map((lang) =>
  lang.NAME.toLowerCase(),
)

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

  /**
   * @param {object} data User data
   * @param {string} data.email User email
   * @param {string} data.firstName User First name
   * @param {string} data.lastName User Last name
   * @param {string} data.phone User phone
   * @param {string} data.lang User language (en - fr)
   */
  register: async (data) => {
    const { email, password, firstName, lastName, phone, lang } = data

    if (!email || !password) throw new Error('Email and Password are required')

    const users = await read({ email })

    if (users.length) throw new Error('Email already used')

    if (lang && !authorizedLangs.includes(lang))
      throw new Error('Lang not accepted')

    const langId = (await getLangByISO(LANG.ENGLISH.NAME.toLowerCase()))._id

    const user = await create({
      email,
      firstName,
      lastName,
      phone,
      lang: langId,
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
