'use strict'

const pingRouter = require('./ping')
const authRouter = require('./auth')
const userRouter = require('./users')

module.exports = app => {
  app.use('/ping', pingRouter)
  app.use('/v1/auth', authRouter)
  app.use('/v1/users', userRouter)
}
