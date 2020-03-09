'use strict'

const contactRouter = require('express').Router()

const {
  retrieveContacts,
  createContact,
  retrieveContact,
} = require('../controllers/contact')

contactRouter
  .get('/', retrieveContacts)
  .post('/', createContact)
  .get('/:id', retrieveContact)

module.exports = contactRouter
