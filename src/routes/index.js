'use strict'

const pingRouter = require('./ping')
const authRouter = require('./auth')
const userRouter = require('./user')
const coachRouter = require('./coach')
const serviceRouter = require('./service')
const langRouter = require('./lang')
const contactRouter = require('./contact')
const geoSpatialRouter = require('./geo-spatial')
const sportRouter = require('./sport')
const exerciseRouter = require('./exercise')

module.exports = (app) => {
  app
    .use('/ping', pingRouter)
    .use('/v1/auth', authRouter)
    .use('/v1/user', userRouter)
    .use('/v1/coach', coachRouter)
    .use('/v1/service', serviceRouter)
    .use('/v1/contact', contactRouter)
    .use('/v1/geo-spatial', geoSpatialRouter)
    .use('/v1/sport', sportRouter)
    .use('/v1/exercise', exerciseRouter)

    // Admin routes
    // TODO: secure admin route by using middleware
    .use('/v1/lang', langRouter)
}
