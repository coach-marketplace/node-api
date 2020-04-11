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
   * @param {string} stringToCompare String to compare
   * @param {string} encryptedString Encrypted string
   * @return {object} Promise
   */
  compareHash: async (stringToCompare, encryptedString) => {
    const areStringMatch = await bcrypt.compare(
      encryptedString,
      stringToCompare,
    )

    return areStringMatch
  },
}
