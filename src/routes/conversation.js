'use strict'

const conversationRouter = require('express').Router()

const { requireJWTAuth, onlyAdmin } = require('../middleware/auth')

const {
  retrieveConversations,
  createConversation,
} = require('../controllers/conversation')

conversationRouter
  .get('/', requireJWTAuth, onlyAdmin, retrieveConversations)
  .post('/', requireJWTAuth, onlyAdmin, createConversation)

module.exports = conversationRouter
