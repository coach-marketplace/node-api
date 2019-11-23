'use strict'

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../doc/swagger.json')

const pingRouter = require('./ping')
const authRouter = require('./auth')
const userRouter = require('./users')
const coachRouter = require('./coach')

module.exports = app => {
  app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/ping', pingRouter)
    .use('/v1/auth', authRouter)
    .use('/v1/users', userRouter)
    .use('/v1/coaches', coachRouter)
}
