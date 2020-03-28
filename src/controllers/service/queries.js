'use strict'

const mongoose = require('mongoose')

const Service = require('../../models/service')

module.exports = {
  create(data) {
    console.log('data', data)
    const { user, title, description, price, currency } = data
    const newService = new Service({
      _id: new mongoose.Types.ObjectId(),
      user: new mongoose.Types.ObjectId(user),
      title,
      description,
      price: Number(price),
      currency: new mongoose.Types.ObjectId(currency),
    })
    return newService.save()
  },

  read(query = {}) {
    return Service.find(query)
  },

  async searchServices(query) {
    const q = Service.find({ $text: { $search: query } })
    const services = await q.exec().then(results => {
      return results
    })
    return services
  },
}
