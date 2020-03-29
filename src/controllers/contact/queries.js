'use strict'

const mongoose = require('mongoose')

const Contact = require('../../models/contact')

module.exports = {
  create(newContactData) {
    const { owner, lead, type } = newContactData
    const newContact = new Contact({
      _id: new mongoose.Types.ObjectId(),
      owner,
      lead,
      type,
    })

    return newContact.save()
  },

  read(query = {}) {
    return Contact.find(query)
  },
}
