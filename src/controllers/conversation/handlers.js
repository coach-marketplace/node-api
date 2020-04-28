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
 * @param {string} id Conversation id
 * @return {object} Conversation
 */
const getConversationById = async (id) => {
  if (!id) throw new Error('participantId is required')

  if (!ObjectId.isValid(id)) throw new Error('participantId is invalid')

  const conversation = await read({ _id: id }).populate('participants.user')

  return conversation[0]
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
  }).populate('participants.user')

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
  }).populate('participants.user')

  if (!conversations.length) return null

  const matchedConversation = conversations.filter((conv) => {
    const ids = conv.participants.map((p) => p.user._id)
    return ids.sort().toString() === participantIds.sort().toString()
  })

  return matchedConversation[0]
}

/**
 * @param {string} ownerId Id of the contact owner
 * @param {[string]} memberIds List of member ids
 * @return {string} New conversation ID (or existing conversation)
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
    ...members.map((member) => member && member._id),
  ])

  if (conversation) return conversation._id

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

  return newConversation._id
}

/**
 * Same as getConversationsByParticipantId but we give back user info too
 * @param {string} userId User id
 * @return {array} List of conversations
 */
const getConversationsByUserId = async (userId) => {
  if (!userId) throw new Error('userId is required')

  if (!ObjectId.isValid(userId)) throw new Error('userId is invalid')

  const conversations = await read({
    participants: { $elemMatch: { user: userId } },
  }).populate('participants.user')

  return conversations
}

module.exports = {
  createConversation,
  getAllConversations,
  getConversationById,
  getConversationsByParticipantId,
  getConversationByParticipantsIds,
  getConversationsByUserId,
}
