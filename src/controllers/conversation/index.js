'use strict'

const { createConversation, getAllConversations } = require('./handlers')

module.exports = {
  createConversation: async (req, res) => {
    try {
      const {
        body: { ownerId, memberIds, messageText },
      } = req

      if (!ownerId) throw new Error('OwnerId is required')
      if (!memberIds.length) throw new Error('At least one member is required')

      const newConversation = await createConversation(ownerId, memberIds)

      res.status(201).json(newConversation)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in conversation creation',
        debug_message: error.message,
      })
    }
  },

  retrieveConversations: async (req, res) => {
    try {
      const conversation = await getAllConversations()

      res.status(201).json(conversation)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in getting all conversations',
        debug_message: error.message,
      })
    }
  },
}
