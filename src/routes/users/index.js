'use strict'

const userRouter = require('express').Router()

const {
  readUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser,
} = require('../../controllers/user/index.js')

userRouter
  .get('/', readUsers)
  .post('/', createUser)
  .get('/:id', readUser)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser)

module.exports = userRouter
