'use strict'

const geoSpatialRouter = require('express').Router()

const { retrieveLocation } = require('../controllers/geo-spatial')

geoSpatialRouter.get('/by-address', retrieveLocation)

module.exports = geoSpatialRouter
