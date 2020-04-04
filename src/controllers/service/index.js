'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { create, read, searchServices } = require('./queries')
const { read: readCurrency } = require('../currency/queries')
const { read: readUser } = require('../user/queries')

module.exports = {
  /**
   * Create a service
   */
  createService: async (req, res) => {
    try {
      const { coach, title, description, price, currency } = req.body

      /**
       * Check if the coach value is a valid mongoID
       */
      if (!ObjectId.isValid(coach)) {
        throw new Error('Coach is not a valid id')
      }

      /**
       * Check is coach ID is a real user in DB
       */
      const user = await readUser({ _id: coach })
      if (!user.length) {
        throw new Error('Error in coach')
      }

      // Todo: re add the currency check
      /**
       * Check if currency name is correct in DB
       */
      // const curr = await readCurrency({ name: currency })
      // if (!curr.length) {
      //   throw new Error('Error in currency')
      // }

      const newServiceData = {
        user: user[0]._id,
        title: title,
        description: description,
        price: price,
        // currency: curr[0]._id,
      }

      const newService = await create(newServiceData)
      res.status(201).json(newService)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in service creation',
        debug_message: error.message,
      })
    }
  },

  /**
   * get all services
   */
  readServices: async (req, res) => {
    try {
      const services = await read()
      res.status(201).json(services)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all offers',
        debug_message: error.message,
      })
    }
  },

  /**
   * Find service by id
   **/
  getServiceById: async (req, res) => {
    try {
      const {
        params: { id },
      } = req

      /**
       * Check if the coach value is a valid mongoID
       */
      if (!ObjectId.isValid(id)) {
        throw new Error('ID is not valid')
      }

      const service = await read({ _id: id })

      if (!service || !service.length) {
        throw new Error('No service corresponding with this id')
      }

      res.status(201).json(service[0])
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all offers',
        debug_message: error.message,
      })
    }
  },

  /** // TODO: rename this to service
   * Search offers with query
   **/
  searchOffers: async (req, res) => {
    try {
      let services = null
      const { query } = req.body
      if (!query) {
        services = await read()
      } else {
        services = await searchServices(query)
      }
      res.status(201).json(services)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in searching services',
        debug_message: error.message,
      })
    }
  },
}
