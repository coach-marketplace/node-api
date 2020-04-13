'use strict'

const mongoose = require('mongoose')

const Conversation = require('../../models/conversation')

module.exports = {
  /**
   * @param {[object]} participants List of participants
   * @param {[object]} messages List of messages
   * @return {object} Mongoose query object
   */
  create(participants, messages) {
    const newConversation = new Conversation({
      _id: new mongoose.Types.ObjectId(),
      participants,
      messages,
    })

    return newConversation.save()
  },

  /**
   * @param {query} query Query object
   * @return {object} Mongoose query object
   */
  read(query = {}) {
    return Conversation.find(query)
  },
}
