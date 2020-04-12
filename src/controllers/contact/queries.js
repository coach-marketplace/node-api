'use strict'

const mongoose = require('mongoose')

const Contact = require('../../models/contact')

module.exports = {
  /**
   * @param {string} ownerId
   * @param {string} leadId
   * @param {string} type
   * @return {object} Mongoose query object
   */
  create(ownerId, leadId, type) {
    const newContact = new Contact({
      _id: new mongoose.Types.ObjectId(),
      owner: new mongoose.Types.ObjectId(ownerId),
      lead: new mongoose.Types.ObjectId(leadId),
      type,
    })

    return newContact.save()
  },

  /**
   * @param {query} query Query object
   * @return {object} Mongoose query object
   */
  read(query = {}) {
    return Contact.find(query)
  },
}
