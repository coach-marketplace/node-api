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
   * @description https://github.com/kelektiv/node.bcrypt.js#to-check-a-password
   * @param {string} plainString String to compare
   * @param {string} hash Encrypted hash
   * @return {object} Promise
   */
  compareHash: async (plainString, hash) => {
    const areStringMatch = await bcrypt.compare(plainString, hash)

    return areStringMatch
  },
}
