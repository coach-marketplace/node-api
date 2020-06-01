'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { read, create } = require('./queries')
const { WEIGHTS, DISTANCES } = require('../../_utils/constants')

/**
 * @param {string} userId
 * @param {number} weight
 * @param {string} weightUnit
 * @param {number} height
 * @param {string} heightUnit
 * @param {string} date
 * @return {object} New physical metrics
 */
const createUserPhysicalMetrics = async (
  userId,
  weight,
  weightUnit,
  height,
  heightUnit,
  date,
) => {
  if (!userId) throw new Error('userId is required')

  if (!ObjectId.isValid(userId)) throw new Error('userId is invalid')

  if (!weight) throw new Error('weight is required')
  if (!weightUnit) throw new Error('weightUnit is required')
  if (!WEIGHTS.includes(weightUnit)) throw new Error('weightUnit is invalid')

  if (!height) throw new Error('height is required')
  if (!heightUnit) throw new Error('heightUnit is required')
  if (!DISTANCES.includes(heightUnit)) throw new Error('heightUnit is invalid')

  if (!date) throw new Error('date is required')

  const newPhysicalMetrics = await create(
    userId,
    weight,
    weightUnit,
    height,
    heightUnit,
    date,
  )

  return newPhysicalMetrics
}

/**
 *
 * @param {id} id Physical Metrics id
 */
const getPhysicalMetricsByUserId = async (id) => {
  const physicalMetrics = await read({ user: id })

  return physicalMetrics
}

module.exports = {
  createUserPhysicalMetrics,
  getPhysicalMetricsByUserId,
}
