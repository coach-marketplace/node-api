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
}
