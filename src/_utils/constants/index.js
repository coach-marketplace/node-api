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

/**
 * Language are following these:
 * - (lang) ISO 639-1 : https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 * - (country) Alpha-2 code: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
 */
const LANG = {
  FRENCH: { NAME: 'FR', COUNTRY: 'FR' },
  ENGLISH: { NAME: 'EN', COUNTRY: 'US' },
}

const CONSOLE_LOG_CODE = {
  RESET: '\x1b[0m',
  FONT_COLOR: {
    RED: '\x1b[31m',
  },
}

const TYPE = {
  CONVERSATION_PARTICIPANT: {
    OWNER: 'owner',
    MEMBER: 'member',
  },
}

const UNIT = {
  HEIGHT: {
    CM: 'cm',
    IN: 'in',
  },
  WEIGHT: {
    KG: 'kg',
    LB: 'lb',
  },
}

module.exports = {
  USER_ACCOUNT_TYPE,
  CONTACT_TYPE,
  CONSOLE_LOG_CODE,
  CURRENCY,
  LANG,
  CONVERSATION_PARTICIPANT: TYPE.CONVERSATION_PARTICIPANT,
  CONVERSATION_PARTICIPANTS: Object.values(TYPE.CONVERSATION_PARTICIPANT),
  UNIT,
}
