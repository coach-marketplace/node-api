'use strict'

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../doc/swagger.json')

const pingRouter = require('./ping')
const authRouter = require('./auth')
const userRouter = require('./users')

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.use('/ping', pingRouter)
  app.use('/v1/auth', authRouter)
  app.use('/v1/users', userRouter)
}
