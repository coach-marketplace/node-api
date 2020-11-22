'use strict'

const userRouter = require('express').Router()

// TODO: upload avatar for local account
const {
  requireJWTAuth,
  requireAccessMyData,
  onlyAdmin,
} = require('../middleware/auth')
const { uploadUserAvatar } = require('../middleware/upload')
const userController = require('../controllers/user')

userRouter
  .get('/me', requireJWTAuth, userController.getMe)
  .post('/', requireJWTAuth, onlyAdmin, userController.createNewUser)
  .get('/', requireJWTAuth, onlyAdmin, userController.retrieveUsers)
  .get('/:id', requireJWTAuth, requireAccessMyData, userController.retrieveUser)
  .put('/:id', requireJWTAuth, requireAccessMyData, userController.updateUser)
  .delete('/:id', userController.deleteUser)
  .post(
    '/:id/avatar',
    requireJWTAuth,
    requireAccessMyData,
    uploadUserAvatar,
    userController.addAvatar,
  )
  .post(
    '/:id/change-password',
    requireJWTAuth,
    requireAccessMyData,
    userController.changeUserPassword,
  )
  .get(
    '/:id/physical-metrics',
    requireJWTAuth,
    userController.retrieveUserPhysicalMetrics,
  ) // TODO: Require accessmydata?
  .post(
    '/:id/physical-metrics',
    requireJWTAuth,
    userController.addUserPhysicalMetrics,
  ) // TODO: Require accessmydata?
  .get(
    '/:id/conversations',
    requireJWTAuth,
    requireAccessMyData,
    userController.retrieveUserConversations,
  )
  .post(
    '/:id/conversations',
    requireJWTAuth,
    requireAccessMyData,
    userController.startConversation,
  )
  .get(
    '/:id/conversations/:conversationId',
    requireJWTAuth,
    requireAccessMyData,
    userController.retrieveUserConversation,
  )
  .get(
    '/:id/conversations/:conversationId/messages',
    requireJWTAuth,
    requireAccessMyData,
    userController.retrieveUserConversationMessages,
  )
  .post(
    '/:id/conversations/:conversationId/messages',
    requireJWTAuth,
    requireAccessMyData,
    userController.postMessageToConversation,
  )

module.exports = userRouter
