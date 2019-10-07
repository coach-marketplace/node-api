'use strict'

const userRouter = require('express').Router()

const isAuth = require('../../middleware/isAuth')
const userController = require('../../controllers/user/index.js')

userRouter.get('/', userController.readAll)
userRouter.post('/', userController.create)
userRouter.get('/:id', isAuth, userController.read)
userRouter.put('/:id', isAuth, userController.update)
userRouter.delete('/:id', isAuth, userController.del)

module.exports = userRouter
