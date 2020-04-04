const USER_ACCOUNT_TYPE = {
  LOCAL: 'local',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
}

const CONTACT_TYPE = {
  TRAINEE: 'trainee',
}

const CURRENCY = {
  EUR: { NAME: 'EUR', LABEL: 'Euro', SYMBOL: '€' },
  USD: { NAME: 'USD', LABEL: 'United States dollar', SYMBOL: '$' },
}

const CONSOLE_LOG_CODE = {
  RESET: '\x1b[0m',
  FONT_COLOR: {
    RED: '\x1b[31m',
  },
}

module.exports = {
  USER_ACCOUNT_TYPE,
  CONTACT_TYPE,
  CONSOLE_LOG_CODE,
  CURRENCY,
}
