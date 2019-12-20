'use strict'

const userRouter = require('express').Router()

const { uploadUserAvatar } = require('../../middleware/file-upload')

const {
  readUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser,
  addUserAvatar,
} = require('../../controllers/user/index.js')

userRouter
  .get('/', readUsers)
  .post('/', createUser)
  .get('/:id', readUser)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser)
  .post('/:id/avatar', uploadUserAvatar, addUserAvatar)

module.exports = userRouter
