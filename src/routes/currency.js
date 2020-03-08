'use strict'

const currencyRouter = require('express').Router()

const {
  retrieveCurrencies,
  createCurrency,
  retrieveCurrency,
} = require('../controllers/currency')

currencyRouter
  .get('/', retrieveCurrencies)
  .post('/', createCurrency)
  .get('/:id', retrieveCurrency)

module.exports = currencyRouter
