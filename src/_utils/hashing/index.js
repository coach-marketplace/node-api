'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  encryptString: stringToHash => {
    const saltRounds = 10
    return bcrypt.hash(stringToHash, saltRounds)
  },
  compareHash: async (encryptedString, stringToCompare) => {
    var comparison = await bcrypt.compare(stringToCompare, encryptedString)
    return comparison;
  },
}
