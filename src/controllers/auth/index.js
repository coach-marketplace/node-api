'use strict'

const queryString = require('query-string')

const { register, registerWithGoogle, validateEmail } = require('./handlers')
const { getUserById, addAccount } = require('../user/handlers')
const { signToken } = require('../../_utils/jwt')
const { USER_ACCOUNT_TYPE } = require('../../_utils/constants')

const signTokenWithUser = (user) =>
  signToken({ _id: user._id, isAdmin: user.isAdmin })

const loginWithGoogle = async (req, res) => {
  /**
   * In that specific case we need more than the user, that's why the variable's
   * name isn't relevant. Passport put the result in req.user by default.
   */
  let { redirectUrl, user, profile, isCoach } = req.user

  try {
    if (!user) {
      user = await registerWithGoogle(profile, isCoach)
    } else {
      // the user exist
      const googleAccount = user.accounts.find(
        (account) => account && account.type === USER_ACCOUNT_TYPE.GOOGLE,
      )

      if (!googleAccount) {
        const newAccount = {
          type: USER_ACCOUNT_TYPE.GOOGLE,
          id: profile._json.sub,
          avatar: profile._json.picture || null,
        }

        await addAccount(user._id, newAccount)
      }
    }

    const token = `Bearer ${signTokenWithUser(user)}`
    const hasUrlQueryParams = redirectUrl.includes('?')
    const symbol = hasUrlQueryParams ? '&' : '?'

    res.redirect(`${redirectUrl}${symbol}${queryString.stringify({ token })}`)
  } catch (error) {
    const hasUrlQueryParams = redirectUrl.includes('?')
    const symbol = hasUrlQueryParams ? '&' : '?'
    res.redirect(
      `${redirectUrl}${symbol}${queryString.stringify({
        error: error.message,
      })}`,
    )
  }
}

module.exports = {
  registerLocal: async (req, res) => {
    try {
      const user = await register(req.body)

      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error while trying to register',
        debug_message: error.message,
      })
    }
  },

  login: async (req, res) => {
    if (!req.user) {
      res.status(401).json({
        message: 'Email or password incorrect',
      })
    } else {
      const user = await getUserById(req.user._id)
      const token = signToken({ _id: user._id, isAdmin: user.isAdmin })

      res.status(201).json({
        user: req.user,
        token: `Bearer ${token}`,
      })
    }
  },

  /**
   * getAuthUser
   *
   * This Middleware should be use after the passport auth with JWT Strategy
   * one. Then we should have already the user into the `req.user` done by
   * passport middleware for us.
   */
  getAuthUser: async (req, res) => {
    try {
      res.status(200).json(req.user)
    } catch (error) {
      res.status(500).json({
        public_message: 'Unauthorized',
        debug_message: error.message,
      })
    }
  },

  loginWithGoogle,
  verifyEmail: async (req, res) => {
    try {
      let {
        params: { userId, token },
      } = req
      if (!userId) throw Error('No user id')
      if (!token) throw Error('No token')

      await validateEmail(userId, token)

      res.status(200).json('ok')
    } catch (error) {
      res.status(500).json({
        public_message: 'We could not verify your email',
        debug_message: error.message,
      })
    }
  },
}
