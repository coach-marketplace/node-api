'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { create, read } = require('./queries')

/**
 * @param {string} conversationId Id of conversation
 * @param {string} userId Id of user
 * @param {string} text Message
 * @return {object} Created message
 */
const createMessage = async (conversationId, userId, text) => {
  if (!conversationId) throw new Error('conversationId is required')

  if (!ObjectId.isValid(conversationId))
    throw new Error('conversationId is invalid')

  if (!userId) throw new Error('userId is required')

  if (!ObjectId.isValid(userId)) throw new Error('userId is invalid')

  if (!text || !text.length) throw new Error('text is required')

  const newMessage = await create(conversationId, userId, text)

  return newMessage
}

/**
 * @param {string} conversationId Id of conversation
 * @return {array} Messages
 */
const retrieveMessagesByConversationId = async (conversationId) => {
  if (!conversationId) throw new Error('conversationId is required')

  if (!ObjectId.isValid(conversationId))
    throw new Error('conversationId is invalid')

  const messages = await read({ conversation: conversationId })

  return messages
}

module.exports = {
  createMessage,
  retrieveMessagesByConversationId,
}
