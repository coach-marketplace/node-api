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
 * @param {string} participantId User id
 * @return {array} List of conversations
 */
const getConversationsByParticipantId = async (participantId) => {
  if (!participantId) throw new Error('participantId is required')

  if (!ObjectId.isValid(participantId))
    throw new Error('participantId is invalid')

  const conversations = await read({
    participants: { $elemMatch: { user: participantId } },
  })

  return conversations
}

/**
 * @param {[string]} participantIds User id
 * @return {object} Conversation
 */
const getConversationByParticipantsIds = async (participantIds) => {
  if (!participantIds) throw new Error('participantIds is required')

  if (!participantIds.length >= 2)
    throw new Error('A conversation should have at least 2 participants')

  // Check is all ids are valid
  if (participantIds.some((id) => !ObjectId.isValid(id)))
    throw new Error('Participants ids are not valid')

  // Get all conversations containing at least minimum the 2 first users
  const conversations = await read({
    participants: {
      $elemMatch: { user: { $in: [participantIds[0], participantIds[1]] } },
    },
  })

  if (!conversations.length) return []

  const matchedConversation = conversations.filter((conv) => {
    const ids = conv.participants.map((p) => p.user)
    return ids.sort().toString() === participantIds.sort().toString()
  })

  return matchedConversation[0]
}

/**
 * @param {string} ownerId Id of the contact owner
 * @param {[string]} memberIds List of member ids
 * @return {object} New contact
 */
const createConversation = async (ownerId, memberIds) => {
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
  const conversation = await getConversationByParticipantsIds([
    owner._id,
    ...members.map((m) => m._id),
  ])

  if (conversation) return conversation

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

  const newConversation = await create(participants)

  return newConversation
}

module.exports = {
  createConversation,
  getAllConversations,
  getConversationsByParticipantId,
  getConversationByParticipantsIds,
}
