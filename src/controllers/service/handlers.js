'use strict'

const { create } = require('./queries')
const { CURRENCY } = require('../../_utils/constants')

module.exports = {
  addService: async (data) => {
    const allowedCurrencies = Object.keys(CURRENCY)

    if (!allowedCurrencies.includes(data.currency)) {
      throw new Error('Invalid currency')
    }

    const normalizedCurrency = {
      name: CURRENCY[data.currency].NAME,
      label: CURRENCY[data.currency].LABEL,
      symbol: CURRENCY[data.currency].SYMBOL,
    }

    const response = await create({
      title: data.title,
      description: data.description,
      price: data.price,
      address: data.address,
      coordinates: data.coordinates,
      currency: normalizedCurrency,
    })

    return response
  },
}
