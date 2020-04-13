'use strict'

// TODO: Should user handlers and not directly queries
const { read, create } = require('./queries')

module.exports = {
  createContact: async (req, res) => {
    try {
      const { owner, lead, type } = req.body

      if (!owner || !lead || !type) {
        throw new Error('Field is missing')
      }

      const newContact = await create({ owner, lead, type })

      res.status(201).json(newContact)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in contact creation',
        debug_message: error.message,
      })
    }
  },

  retrieveContacts: async (req, res) => {
    try {
      const contacts = await read()

      res.status(201).json(contacts)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all contacts',
        debug_message: error.message,
      })
    }
  },

  retrieveContact: async (req, res) => {
    try {
      const {
        params: { id },
      } = req

      const contact = (await read({ _id: id }))[0]

      res.status(201).json(contact)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting contact',
        debug_message: error.message,
      })
    }
  },
}
