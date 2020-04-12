'use strict'

const { read } = require('./queries')

module.exports = {
  getLangByISO: async (iso) => {
    const lang = (await read({ ISO_639_1: iso }))[0]

    return lang
  },
}
