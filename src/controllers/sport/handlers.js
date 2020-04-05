'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const {
  createSportContent,
  createSport,
  readSport,
  readSportContent,
} = require('./queries')

module.exports = {
  /**
   * @param {object} data {name, langId}
   * @return Created sport
   */
  createSport: async (data) => {
    const { name, langId } = data

    if (!name) {
      throw new Error('Name is required')
    }

    if (!ObjectId.isValid(langId)) {
      throw new Error('Lang id is incorrect')
    }

    const newSport = await createSport()
    const newSportContent = await createSportContent({
      sport: newSport._id,
      lang: langId,
      name,
    })

    return { newSport, newSportContent }
  },

  /**
   * @param {string} id Sport ID
   * @param {string} lang Language ISO_639_1 (e.g. 'en')
   * @return Sport
   */
  getSportById: async (id, lang = DEFAULT_LANG) => {
    if (!id) {
      throw new Error('SportId is required')
    }

    if (!ObjectId.isValid(id)) {
      throw new Error('Lang id is incorrect')
    }

    const sportContents = await readSportContent({ sport: id })
      .populate({ path: 'lang', select: '_id ISO_639_1' })
      .populate({ path: 'sport', select: '-__v' })
      .select('-_id -__v -createdAt -updatedAt')
      .lean()

    if (!sportContents.length) {
      return null
    }

    const sportContent = sportContents.find(
      (item) => item.lang.ISO_639_1 === lang,
    )

    /**
     * We have to recreate the sport object
     */
    const sport = {
      ...sportContent,
      ...sportContent.sport,
    }
    delete sport.sport

    return sport
  },

  /**
   * @return List of sports
   */
  getAllSports: async () => await readSport(),
}
