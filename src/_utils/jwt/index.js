/* eslint-disable no-undef */
'use strict'

const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = {
  signToken: data => {
    return jwt.sign(data, secret, {
      expiresIn: '7d',
    })
  },
  // verifyToken: token => jwt.verify(token, secret),
}
