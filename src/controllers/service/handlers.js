'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { create, read } = require('./queries')
const { CURRENCY } = require('../../_utils/constants')

module.exports = {
  addService: async (data) => {
    const allowedCurrencies = Object.keys(CURRENCY)

    if (!allowedCurrencies.includes(data.currency)) {
      throw new Error('Invalid currency')
    }

    if (!ObjectId.isValid(owner)) {
      throw new Error('Owner id is incorrect')
    }

    const normalizedCurrency = {
      name: CURRENCY[data.currency].NAME,
      label: CURRENCY[data.currency].LABEL,
      symbol: CURRENCY[data.currency].SYMBOL,
    }

    const response = await create({
      owner: data.owner,
      title: data.title,
      description: data.description,
      price: data.price,
      address: data.address,
      coordinates: data.coordinates,
      currency: normalizedCurrency,
    })

    return response
  },

  retrieveCoachServices: async (coachId) => {
    const response = await read({ owner: coachId })

    return response
  },
}
