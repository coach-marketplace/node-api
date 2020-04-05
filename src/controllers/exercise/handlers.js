'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const {
  createExerciseContent,
  createExercise,
  readExercise,
  readExerciseContent,
} = require('./queries')

module.exports = {
  /**
   * @param {string} userOwnerId Required
   * @param {string} langId Required
   * @param {string} name Required
   * @param {string} sportId Optional
   * @param {string} instructions Optional
   * @param {string} videoUrl Optional
   * @param {boolean} isPrivate Default: false
   * @return Created sport
   */
  createExercise: async (
    userOwnerId,
    langId,
    name,
    sportId,
    instructions,
    videoUrl,
    isPrivate = false,
  ) => {
    if (!userOwnerId) throw new Error('userOwnerId is required')

    if (!ObjectId.isValid(userOwnerId))
      throw new Error('userOwnerId is incorrect')

    if (!langId) throw new Error('langId is required')

    if (!ObjectId.isValid(langId)) throw new Error('langId is incorrect')

    if (!name) throw new Error('name is required')

    const newExercise = await createExercise(userOwnerId, sportId, isPrivate)
    const newExerciseContent = await createExerciseContent(
      newExercise._id.toString(),
      langId.toString(),
      name,
      instructions,
      videoUrl,
    )

    return { newExercise, newExerciseContent }
  },

  /**
   * @param {string} id Exercise ID
   * @param {string} lang Language ISO_639_1 (e.g. 'en')
   * @return Sport
   */
  // eslint-disable-next-line no-undef
  getExerciseById: async (id, lang = DEFAULT_LANG) => {
    if (!id) throw new Error('Id is required')

    if (!ObjectId.isValid(id)) throw new Error('Id is incorrect')

    const exerciseContents = await readExerciseContent({ exercise: id })
      .populate({ path: 'lang', select: '_id ISO_639_1' })
      .populate({ path: 'exercise', select: '-__v' })
      .select('-_id -__v -createdAt -updatedAt')
      .lean()

    if (!exerciseContents.length) return null

    const exerciseContent = exerciseContents.find(
      (item) => item.lang.ISO_639_1 === lang,
    )

    /**
     * We have to recreate the sport object
     */
    const exercise = {
      ...exerciseContent,
      ...exerciseContent.exercise,
    }
    delete exercise.exercise

    return exercise
  },

  /**
   * @return List of exercises
   */
  getAllExercises: async () => await readExercise(),
}
