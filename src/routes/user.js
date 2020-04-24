'use strict'

const userRouter = require('express').Router()

// TODO: upload avatar for local account
// const { uploadUserAvatar } = require('../middleware/file-upload')
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
  // addUserAvatar,
  retrieveUserConversations,
} = require('../controllers/user')

userRouter
  .get('/me', requireJWTAuth, getMe)
  .post('/', requireJWTAuth, onlyAdmin, createNewUser)
  .get('/', requireJWTAuth, onlyAdmin, retrieveUsers)
  .get('/:id', requireJWTAuth, requireAccessMyData, retrieveUser)
  .put('/:id', requireJWTAuth, requireAccessMyData, updateUser)
  .delete('/:id', deleteUser)
  // .post('/:id/avatar', uploadUserAvatar, addUserAvatar)
  .post(
    '/:id/change-password',
    requireJWTAuth,
    requireAccessMyData,
    changeUserPassword,
  )
  .get('/:id/physical-Metrics', retrieveUserPhysicalMetrics)
  .post('/:id/physical-Metrics', addUserPhysicalMetrics)
  .get(
    '/:id/conversations',
    requireJWTAuth,
    requireAccessMyData,
    retrieveUserConversations,
  )

module.exports = userRouter
