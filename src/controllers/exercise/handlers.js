'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const {
  createExercise,
  readExercise,
  aggregateExerciseContent,
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

    const newExercise = await createExercise(
      userOwnerId,
      sportId,
      langId.toString(),
      name,
      instructions,
      videoUrl,
      isPrivate,
    )

    return { newExercise }
  },

  /**
   * @param {string} id Exercise ID
   * @param {string} lang Language ISO_639_1 (e.g. 'en')
   * @return Sport
   */
  getExerciseById: async (id) => {
    if (!id) throw new Error('Id is required')

    if (!ObjectId.isValid(id)) throw new Error('Id is incorrect')

    const exercises = await readExercise({ _id: id }).lean()

    if (!exercises.length) return []

    return exercises[0]
  },

  /**
   * @return List of exercises
   */
  getAllExercises: async () => await readExercise(),

  getExercisesByCoachId: async (coachId) => {
    const r = await aggregateExerciseContent([
      {
        $lookup: {
          from: 'exercise',
          localField: 'exercise',
          foreignField: '_id',
          as: 'a',
        },
      },
      { $match: {} },
    ])

    // const exerciseContents = await readExerciseContent({ exercise: id })
    //   .populate({ path: 'lang', select: '_id ISO_639_1' })
    //   .populate({ path: 'exercise', select: '-__v' })
    //   .select('-_id -__v -createdAt -updatedAt')
    //   .lean()

    return r
  },
}
