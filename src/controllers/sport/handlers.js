'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { createSport, readSport } = require('./queries')

module.exports = {
  /**
   * @param {object} data {name, langId}
   * @return {object} Created sport
   */
  createSport: async (data) => {
    const { name, langId } = data

    if (!name) {
      throw new Error('Name is required')
    }

    if (!ObjectId.isValid(langId)) {
      throw new Error('Lang id is incorrect')
    }

    const newSport = await createSport(langId, name)

    return newSport
  },

  /**
   * @param {string} id Sport ID
   * @param {string} lang Language ISO_639_1 (e.g. 'en')
   * @return {object} Sport
   */
  getSportById: async (id) => {
    if (!id) {
      throw new Error('SportId is required')
    }

    if (!ObjectId.isValid(id)) {
      throw new Error('Lang id is incorrect')
    }

    const sports = await readSport({ _id: id }).lean()

    if (!sports.length) return []

    return sports[0]
  },

  /**
   * @return List of sports
   */
  getAllSports: async () => await readSport(),
}
