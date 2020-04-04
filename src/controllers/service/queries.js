'use strict'

const mongoose = require('mongoose')

const Service = require('../../models/service')

module.exports = {
  create(data) {
    const {
      owner,
      title,
      description,
      price,
      address,
      coordinates,
      currency,
    } = data

    const newService = new Service({
      _id: new mongoose.Types.ObjectId(),
      owner: new mongoose.Types.ObjectId(owner),
      title,
      description,
      price: Number(price),
      address,
      location: {
        type: 'Point',
        coordinates,
      },
      currency,
    })

    return newService.save()
  },

  read(query = {}) {
    return Service.find(query)
  },

  async searchServices(query) {
    const q = Service.find({ $text: { $search: query } })
    const services = await q.exec().then((results) => {
      return results
    })
    return services
  },
}
