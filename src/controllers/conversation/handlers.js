'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { read, create } = require('./queries')
const { getUserById } = require('../user/handlers')
const { CONVERSATION_PARTICIPANT } = require('../../_utils/constants')

/**
 * @return {array} List of conversations
 */
const getAllConversations = async () => {
  const conversations = await read()

  return conversations
}

/**
 * @param {string} ownerId Id of the contact owner
 * @param {[string]} memberIds List of member ids
 * @param {string} messageText First message
 * @return {object} New contact
 */
const createConversation = async (ownerId, memberIds, messageText) => {
  if (!ownerId) throw new Error('OwnerId is required')
  if (!ObjectId.isValid(ownerId)) throw new Error('OwnerId is invalid')
  if (!memberIds.length) throw new Error('At least one member is required')
  // Check is all ids are valid
  if (memberIds.some((id) => !ObjectId.isValid(id)))
    throw new Error('Members ids are not valid')

  const owner = await getUserById(ownerId)
  const members = await Promise.all(
    memberIds.map(async (id) => await getUserById(id)),
  )

  /**
   * Check is the conversation with same participant already exist
   */
  const newConversationParticipantIds = [
    owner._id,
    ...members.map((m) => m._id),
  ]
    .sort()
    .toString()

  const conversations = await getAllConversations()
  // Only keep the participant ids array
  const participantIds = conversations.reduce(
    (acc, curr) => [...acc, curr.participants.map((p) => p.user)],
    [],
  )
  // Convert each array as a sorted string => ready to be compare to the new one
  const participantIdsAsArrayStrings = participantIds.map((tab) =>
    tab.sort().toString(),
  )

  if (participantIdsAsArrayStrings.includes(newConversationParticipantIds))
    throw new Error('Conversation already exist with these participants')

  const participants = [
    {
      type: CONVERSATION_PARTICIPANT.OWNER,
      user: ObjectId(owner._id),
      lastSeen: new Date(),
    },
    ...members.map((member) => ({
      type: CONVERSATION_PARTICIPANT.MEMBER,
      user: ObjectId(member._id),
      lastSeen: new Date(),
    })),
  ]

  const messages = []
  if (messageText) {
    messages.push({
      user: ObjectId(owner._id),
      message: messageText,
    })
  }

  const newConversation = await create(participants, messages)

  return newConversation
}

module.exports = {
  createConversation,
  getAllConversations,
}
