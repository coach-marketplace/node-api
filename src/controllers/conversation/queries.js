'use strict'

const mongoose = require('mongoose')

const Conversation = require('../../models/conversation')

module.exports = {
  /**
   * @param {[object]} participants List of participants
   * @return {object} Mongoose query object
   */
  create(participants) {
    const newConversation = new Conversation({
      _id: new mongoose.Types.ObjectId(),
      participants,
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
