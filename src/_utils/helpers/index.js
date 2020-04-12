const TokenGenerator = require('uuid-token-generator')

const { CONSOLE_LOG_CODE } = require('../constants')

module.exports = {
  log: (logValue, options = {}) => {
    const { color } = options
    let style = ''

    switch (color) {
      case 'red':
        style = `${CONSOLE_LOG_CODE.FONT_COLOR.RED}%s${CONSOLE_LOG_CODE.RESET}`
        break
      default:
        break
    }

    return console.log(style, logValue)
  },

  /**
   * @param {number} size Token size
   * @return {string} Generated token
   */
  generateUniqueToken: (size = 256) => {
    const token = new TokenGenerator(size, TokenGenerator.BASE62)

    return token.generate()
  },
}
