'use strict'

const { read, create } = require('../user/queries')
const {
  // getUserByEmail,
  // addAccount,
  getUserById,
  editUser,
} = require('../user/handlers')
const { encryptString, compareHash } = require('../../_utils/hashing')
const { USER_ACCOUNT_TYPE, LOCALE, LOCALES } = require('../../_utils/constants')
// const { generateUniqueToken } = require('../../_utils/helpers')
// const { sendVerificationEmail } = require('../../_utils/emails')
// TODO: Send email only for register with local method

const getUserLightData = (user) => ({
  _id: user._id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  isArchived: user.isArchived,
  isCoach: user.isCoach,
  isAdmin: user.isAdmin,
})

/**
 * Log
 *
 * @param {string} email Email of the user
 * @param {string} password Password of the user
 *
 * @returns {object} The logged user
 */
const log = async (email, password) => {
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
}

/**
 * @param {object} data User data
 * @param {string} data.email User email
 * @param {string} data.firstName User First name
 * @param {string} data.lastName User Last name
 * @param {string} data.phone User phone
 * @param {string} data.lang User language (en - fr)
 */
const register = async (data) => {
  const { email, password, firstName, lastName, phone, lang } = data

  if (!email || !password) throw new Error('Email and Password are required')

  const users = await read({ email })

  if (users.length) throw new Error('Email already used')

  if (lang && !LOCALES.includes(lang)) throw new Error('Lang not accepted')

  const user = await create({
    email,
    firstName,
    lastName,
    phone,
    lang: lang || LOCALE.EN_US,
    accounts: [
      {
        type: USER_ACCOUNT_TYPE.LOCAL,
        password: await encryptString(password),
      },
    ],
  })

  return getUserLightData(user)
}

/**
 * @param {object} profile Google user profile
 * @param {string} profile._json.sub User google id
 * @param {string} profile._json.email User email
 * @param {string} profile._json.given_name User First name
 * @param {string} profile._json.family_name User Last name
 * @param {string} profile.picture User avatar
 * @param {string} profile.locale User language (en-US - fr-FR)
 * @param {boolean} isCoach Is coach
 */
const registerWithGoogle = async (profile, isCoach = false) => {
  const {
    _json: {
      email,
      sub: id,
      given_name: firstName,
      family_name: lastName,
      picture: avatar,
      locale,
    },
  } = profile

  /**
   * Keep only take care of 'en' & 'fr' event is locale is something
   * like `en-GB`
   */
  const lang = locale.includes('fr') ? LOCALE.FR_FR : LOCALE.EN_US

  const user = await create({
    email,
    firstName,
    lastName,
    lang,
    isCoach: isCoach,
    accounts: [
      {
        type: USER_ACCOUNT_TYPE.GOOGLE,
        id,
        avatar,
      },
    ],
  })

  return getUserLightData(user)
}

/**
 * @param {string} userId
 * @param {string} token
 */
const validateEmail = async (userId, token) => {
  let user = await getUserById(userId)
  if (user.emailToken !== token) {
    throw Error('Invalid token')
  } else {
    await editUser(userId, {
      isEmailVerified: true,
      emailConfirmedAt: Date.now(),
    })
    return
  }
}

module.exports = {
  log,
  register,
  registerWithGoogle,
  validateEmail,
}
