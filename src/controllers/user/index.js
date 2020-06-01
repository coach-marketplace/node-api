'use strict'

const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  checkUserExistenceByEmail,
  deleteUserById,
  editUser,
  updateUserPassword,
} = require('./handlers')
const {
  getConversationsByUserId,
  getConversationById,
  createConversation,
} = require('../conversation/handlers')
const {
  createMessage,
  retrieveMessagesByConversationId,
} = require('../message/handlers')
const {
  createUserPhysicalMetrics,
  getPhysicalMetricsByUserId,
} = require('../physical-metrics/handlers')
const { encryptString, compareHash } = require('../../_utils/hashing')
const { USER_ACCOUNT_TYPE, UNIT } = require('../../_utils/constants')

const createNewUser = async (req, res) => {
  try {
    const { email, firstName, lastName, phone, password, isCoach } = req.body

    if (!email) throw new Error('email is required')

    const user = await checkUserExistenceByEmail(email)
    console.log(user)

    if (user) {
      throw new Error('This email is already used')
    }

    const newUser = await createUser(
      email,
      firstName,
      lastName,
      phone,
      password,
      isCoach,
    )

    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({
      public_message: 'Cannot create user',
      debug_message: error.message,
    })
  }
}

const retrieveUsers = async (_req, res) => {
  try {
    const users = await getAllUsers()

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error to retrieves users',
      debug_message: error.message,
    })
  }
}

const retrieveUser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req

    const user = await getUserById(id)

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      public_message: 'User not found',
      debug_message: error.message,
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const {
      body,
      params: { id },
    } = req

    const newUser = await editUser(id, body)

    res.status(200).json(newUser)
  } catch (error) {
    res.status(500).json({
      public_message: 'Cannot update the user',
      debug_message: error.message,
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req

    await deleteUserById(id)

    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({
      public_message: 'Cannot delete the user',
      debug_message: error.message,
    })
  }
}

const getMe = async (req, res) => {
  try {
    const user = await getUserById(req.user._id)

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      public_message: 'Unauthorized',
      debug_message: error.message,
    })
  }
}

const startConversation = async (req, res) => {
  try {
    const {
      user: { _id },
      body: { memberIds },
    } = req

    if (!memberIds.length) throw new Error('At least one member is required')

    const newConversationId = await createConversation(_id, memberIds)
    const newConversation = await getConversationById(newConversationId)

    res.status(201).json(newConversation)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in starting the conversation',
      debug_message: error.message,
    })
  }
}

const retrieveUserConversation = async (req, res) => {
  try {
    const {
      params: { conversationId },
    } = req

    const conversation = await getConversationById(conversationId)

    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json({
      public_message: 'Conversation not found',
      debug_message: error.message,
    })
  }
}

const retrieveUserConversations = async (req, res) => {
  try {
    const conversations = await getConversationsByUserId(req.user._id)

    res.status(200).json(conversations)
  } catch (error) {
    res.status(500).json({
      public_message: 'Conversations not found',
      debug_message: error.message,
    })
  }
}

const retrieveUserConversationMessages = async (req, res) => {
  try {
    const {
      params: { id: userId, conversationId },
    } = req

    const conversation = await getConversationById(conversationId)

    if (!conversation) throw new Error('Conversation not found')

    const participantsIds = conversation.participants.map((participant) =>
      participant.user._id.toString(),
    )

    if (!participantsIds.includes(userId))
      throw new Error('User is not in this conversation')

    const messages = await retrieveMessagesByConversationId(conversationId)

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({
      public_message: 'Conversations not found',
      debug_message: error.message,
    })
  }
}

const postMessageToConversation = async (req, res) => {
  try {
    const {
      params: { id: userId, conversationId },
      body: { text },
    } = req

    const conversation = await getConversationById(conversationId)

    if (!conversation) throw new Error('Conversation not found')

    const participantsIds = conversation.participants.map((participant) =>
      participant.user._id.toString(),
    )

    if (!participantsIds.includes(userId))
      throw new Error('User is not in this conversation')

    const newMessage = await createMessage(conversationId, userId, text)

    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).json({
      public_message: 'Impossible to post message',
      debug_message: error.message,
    })
  }
}

const changeUserPassword = async (req, res) => {
  try {
    let {
      body: { current: currentPassword, new: newPassword },
      params: { id },
    } = req

    if (!currentPassword) throw new Error('Password is required')
    if (!newPassword) throw new Error('New password is required')

    await updateUserPassword(id, currentPassword, newPassword)

    res.status(200).json('ok')
  } catch (error) {
    res.status(500).json({
      public_message: 'Cannot change the user password',
      debug_message: error.message,
    })
  }
}

const retrieveUserPhysicalMetrics = async (req, res) => {
  try {
    let { user } = req

    const userPhysicalMetrics = await getPhysicalMetricsByUserId(user._id)

    res.status(200).json(userPhysicalMetrics)
  } catch (error) {
    res.status(500).json({
      public_message: 'Could not retrieve user physical Metrics',
      debug_message: error.message,
    })
  }
}

const addUserPhysicalMetrics = async (req, res) => {
  try {
    let {
      body: { height, weight, date },
      user,
    } = req

    /**
     * For now units are KG and CM by default
     * TODO: let the user enter the unity himself
     */
    const userPhysicalMetrics = await createUserPhysicalMetrics(
      user._id,
      weight.value,
      UNIT.WEIGHT.KG,
      height.value,
      UNIT.DISTANCE.CM,
      date,
    )

    res.status(201).json(userPhysicalMetrics)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not update user physical data',
      debug_message: error.message,
    })
  }
}

module.exports = {
  createNewUser,
  retrieveUser,
  retrieveUsers,
  updateUser,
  deleteUser,
  getMe,
  changeUserPassword,
  addUserPhysicalMetrics,
  retrieveUserPhysicalMetrics,
  startConversation,
  retrieveUserConversation,
  retrieveUserConversationMessages,
  retrieveUserConversations,
  postMessageToConversation,
}
