'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  encryptString: stringToHash => {
    const saltRounds = 10
    return bcrypt.hash(stringToHash, saltRounds)
  },
  isMatching: (encryptedString, stringToCompare) => {
    return bcrypt.compare(encryptedString, stringToCompare)
  }
}
