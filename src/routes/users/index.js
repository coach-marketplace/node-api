'use strict'

const userRouter = require('express').Router()

const auth = require('../../middleware/auth')
const userController = require('../../controllers/user/index.js')

userRouter.get('/', userController.readAll)
userRouter.post('/', userController.create)
userRouter.get('/:id', userController.read)
userRouter.put('/:id', auth.isAuth, userController.update)
userRouter.delete('/:id', auth.isAuth, userController.del)

module.exports = userRouter
