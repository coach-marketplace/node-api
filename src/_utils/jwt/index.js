'use strict'

const jwt = require('jsonwebtoken')

module.exports = {
  getSignedToken: data => {
    return jwt.sign(
      data,
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    )
  },
}
