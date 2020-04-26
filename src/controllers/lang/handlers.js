'use strict'

const { read } = require('./queries')

/**
 * @param {string} iso Lang ISO-639-1 ('en', 'fr',...)
 * @return {object} Lang
 */
const getLangByISO = async (iso) => {
  const lang = (await read({ ISO_639_1: iso }))[0]

  return lang
}

module.exports = {
  getLangByISO,
}
