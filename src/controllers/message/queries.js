'use strict'

const mongoose = require('mongoose')

const Message = require('../../models/message')

module.exports = {
  /**
   * @param {string} conversationId Id of conversation
   * @param {string} userId Id of user
   * @param {string} text Message text
   * @return {object} Mongoose query object
   */
  create(conversationId, userId, text) {
    const newConversation = new Message({
      _id: new mongoose.Types.ObjectId(),
      conversation: new mongoose.Types.ObjectId(conversationId),
      user: new mongoose.Types.ObjectId(userId),
      text,
      isArchived: false,
    })

    return newConversation.save()
  },

  /**
   * @param {query} query Query object
   * @return {object} Mongoose query object
   */
  read(query = {}) {
    return Message.find(query)
  },
}
