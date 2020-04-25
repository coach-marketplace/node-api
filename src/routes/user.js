'use strict'

const userRouter = require('express').Router()

// TODO: upload avatar for local account
const {
  requireJWTAuth,
  requireAccessMyData,
  onlyAdmin,
} = require('../middleware/auth')

const {
  getMe,
  createNewUser,
  retrieveUsers,
  retrieveUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  retrieveUserPhysicalMetrics,
  addUserPhysicalMetrics,
  retrieveUserConversation,
  retrieveUserConversations,
  retrieveUserConversationMessages,
  postMessageToConversation,
  startConversation,
} = require('../controllers/user')

userRouter
  .get('/me', requireJWTAuth, getMe)
  .post('/', requireJWTAuth, onlyAdmin, createNewUser)
  .get('/', requireJWTAuth, onlyAdmin, retrieveUsers)
  .get('/:id', requireJWTAuth, requireAccessMyData, retrieveUser)
  .put('/:id', requireJWTAuth, requireAccessMyData, updateUser)
  .delete('/:id', deleteUser)
  .post(
    '/:id/change-password',
    requireJWTAuth,
    requireAccessMyData,
    changeUserPassword,
  )
  .get('/:id/physical-metrics', retrieveUserPhysicalMetrics)
  .post('/:id/physical-metrics', addUserPhysicalMetrics)
  .get(
    '/:id/conversations',
    requireJWTAuth,
    requireAccessMyData,
    retrieveUserConversations,
  )
  .post(
    '/:id/conversations',
    requireJWTAuth,
    requireAccessMyData,
    startConversation,
  )
  .get(
    '/:id/conversations/:conversationId',
    requireJWTAuth,
    requireAccessMyData,
    retrieveUserConversation,
  )
  .get(
    '/:id/conversations/:conversationId/messages',
    requireJWTAuth,
    requireAccessMyData,
    retrieveUserConversationMessages,
  )
  .post(
    '/:id/conversations/:conversationId/messages',
    requireJWTAuth,
    requireAccessMyData,
    postMessageToConversation,
  )

module.exports = userRouter
