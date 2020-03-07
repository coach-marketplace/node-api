'use strict'

const currencyRouter = require('express').Router()

const {
  retrieveCurrencies,
  createCurrency,
  retireveCurrency,
} = require('../controllers/currency')

currencyRouter
  .get('/', retrieveCurrencies)
  .post('/', createCurrency)
  .get('/:id', retireveCurrency)

module.exports = currencyRouter
