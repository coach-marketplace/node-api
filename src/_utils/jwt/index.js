/* eslint-disable no-undef */
'use strict'

const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = {
  signToken: data => {
    return jwt.sign(data, secret, {
      expiresIn: '1h',
    })
  },
  verifyToken: token => jwt.verify(token, secret),
}
