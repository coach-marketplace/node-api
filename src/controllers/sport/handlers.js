'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { createSport, readSport } = require('./queries')
const { LOCALE, LOCALES } = require('../../_utils/constants')

module.exports = {
  /**
   * @param {object} data {name, lang}
   * @return {object} Created sport
   */
  createSport: async (data) => {
    const { name, lang } = data

    if (!name) throw new Error('Name is required')
    if (!lang) throw new Error('Lang is required')
    if (!localStorage.includes(lang)) throw new Error('Lang is invalid')

    const newSport = await createSport(lang, name)

    return newSport
  },

  /**
   * @param {string} id Sport ID
   * @return {object} Sport
   */
  getSportById: async (id) => {
    if (!id) throw new Error('SportId is required')

    if (!ObjectId.isValid(id)) throw new Error('Id is invalid')

    const sports = await readSport({ _id: id }).lean()

    if (!sports.length) return []

    return sports[0]
  },

  /**
   * @return List of sports
   */
  getAllSports: async () => await readSport(),
}
