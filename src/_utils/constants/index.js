const USER_ACCOUNT_TYPE = {
  LOCAL: 'local',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
}
const USER_ACCOUNT_TYPES = Object.values(USER_ACCOUNT_TYPE)

const CONTACT_TYPE = {
  TRAINEE: 'trainee',
}
const CONTACT_TYPES = Object.values(CONTACT_TYPE)

const CONSOLE_LOG_CODE = {
  RESET: '\x1b[0m',
  FONT_COLOR: {
    RED: '\x1b[31m',
  },
}

module.exports = {
  USER_ACCOUNT_TYPE,
  USER_ACCOUNT_TYPES,
  CONTACT_TYPE,
  CONTACT_TYPES,
  CONSOLE_LOG_CODE,
}
