'use strict'

const userRouter = require('express').Router()

const userController = require('../../controllers/user/index.js')

userRouter.get('/', userController.readAll)
userRouter.post('/', userController.create)
userRouter.get('/:id', userController.read)
userRouter.put('/:id', userController.update)
userRouter.delete('/:id', userController.del)

module.exports = userRouter
