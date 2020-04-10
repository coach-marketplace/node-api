'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  /**
   * @param {string} stringToHash String to hash
   * @return {string} Hashed string
   */
  encryptString: (stringToHash) => {
    const saltRounds = 10

    return bcrypt.hash(stringToHash, saltRounds)
  },

  /**
   * @param {string} encryptedString Encrypted string
   * @param {string} stringToCompare String to compare
   * @return {object} Promise
   */
  compareHash: async (encryptedString, stringToCompare) => {
    const areStringMatch = await bcrypt.compare(
      stringToCompare,
      encryptedString,
    )

    return areStringMatch
  },
}
