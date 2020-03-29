'use strict'

const mongoose = require('mongoose')

const Currency = require('../../models/currency')

module.exports = {
  create(newCurrencyData) {
    const { name, label } = newCurrencyData
    const newCurrency = new Currency({
      _id: new mongoose.Types.ObjectId(),
      name,
      label,
    })

    return newCurrency.save()
  },

  read(query = {}) {
    return Currency.find(query)
  },
}
