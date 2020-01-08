'use strict'

const { pick } = require('lodash')
// const https = require('https')
// const querystring = require('querystring')
// const rp = require('request-promise')

const { encryptString, compareHash } = require('../../_utils/hashing')
const { signToken } = require('../../_utils/jwt')
const { addUser, getUserByEmail, getUserById } = require('../user/queries.js')

module.exports = {
  register: async (req, res) => {
    try {
      const { email, firstName, lastName, password } = req.body
      if (!email || !password) {
        throw new Error('Email and Password are required')
      }
      const hashedPassword = await encryptString(password)
      const newUser = await addUser({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      })
      res.status(201).json(newUser)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error while trying to sign up',
        debug_message: error.message,
      })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw new Error('Email and Password are required')
      }
      const user = (await getUserByEmail(email))[0]
      if (!user) {
        throw new Error('Email or passord incorrect (1)')
      }
      const isMatch = await compareHash(password, user.password)
      if (!isMatch) {
        throw new Error('Email or passord incorrect (2)')
      }
      const token = signToken({ email: user.email, userId: user._id })
      res.status(201).json({ token })
    } catch (error) {
      res.status(500).json({
        public_message: 'Email or password invalid',
        debug_message: error.message,
      })
    }
  },

  getMe: async (req, res) => {
    try {
      const {
        authUser: { userId },
      } = req
      const user = (await getUserById(userId))[0]
      res
        .status(201)
        .json({ user: pick(user, ['email', 'first_name', 'last_name', '_id']) })
    } catch (error) {
      res.status(500).json({
        public_message: 'Unauthorized',
        debug_message: error.message,
      })
    }
  },

  googleLogin: async (req, res) => {
    try {
      // const { code } = req.body
      // console.log('code : ', code)
      // if (!code) {
      //   throw new Error('No code provided')
      // }
      res.send('ok...')
      // const data = {
      //   code: '4/P7q7W91a-oMsCeLvIaQm6bTrgtp7',
      //   client_id: process.env.GOOGLE_CLIENT_ID,
      //   client_secret: process.env.GOOGLE_CLIENT_SECRET,
      //   redirect_uri: '',
      //   grant_type: req.body.code,
      // }

      const options = {
        // method: 'GET',
        // uri: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'POST',
        uri: 'https://www.googleapis.com/oauth2/v4/token',
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        // },
        json: true,
        body: {
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: 'http://localhost:3000/callback',
          grant_type: 'authorization_code',
        },
      }
      console.log('++')

      // rp(options)
      //   .then(function(result) {
      //     // POST succeeded...
      //     console.log('ok', result)
      //     res.status(201).json({ ok: 'ok' })
      //   })
      //   .catch(function(err) {
      //     // POST failed...
      //     console.log('erro', err.message)
      //     res.status(201).json({ error: err.message })
      //   })
      // console.log('====')
      // const post_req = https.request(options, function(res) {
      //   res.setEncoding('utf8')
      //   res.on('data', function(chunk) {
      //     console.log('Response: ' + chunk)
      //   })
      // })

      // post_req.write(data)
      // post_req.end()

      // res.status(201).json({ ok: 'ok' })
    } catch (error) {
      res.status(500).json({
        public_message: 'Impossible to connect via google',
        debug_message: error.message,
      })
    }
  },
}
