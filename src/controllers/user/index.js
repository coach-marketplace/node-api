'use strict'

const { encryptString } = require('../../_utils/hashing')
const {
  create,
  getUsers,
  getUserById,
  editUser,
  removeUserById,
} = require('./queries.js')

module.exports = {
  createUser: async (req, res) => {
    try {
      const { email, firstName, lastName, password } = req.body

      const newUserData = { email }
      firstName && (newUserData.first_name = firstName)
      lastName && (newUserData.last_name = lastName)
      password && (newUserData.password = await encryptString(password))

      const newUser = await create(newUserData)

      res.status(201).json(newUser)
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot create user',
        debug_message: error.message,
      })
    }
  },

  retrieveUsers: async (_req, res) => {
    try {
      const users = await getUsers()

      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({
        public_message: 'No users',
        debug_message: error.message,
      })
    }
  },

  /**
   * Get one user
   */
  retrieveUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req
      const user = (await getUserById(id))[0]
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({
        public_message: 'User not found',
        debug_message: error.message,
      })
    }
  },

  /**
   * Update one user
   */
  updateUser: async (req, res) => {
    try {
      const {
        body: { email, firstName, lastName },
        params: { id },
      } = req
      const updatedData = {}
      email && (updatedData.email = email)
      firstName && (updatedData.first_name = firstName)
      lastName && (updatedData.last_name = lastName)
      // password && (updatedData.password = await encryptString(password))
      const newUser = await editUser(id, updatedData)
      res.status(200).json(newUser)
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot update the user',
        debug_message: error.message,
      })
    }
  },

  /**
   * Delete one user
   */
  deleteUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req
      await removeUserById(id)
      res.status(200).json({ message: 'User deleted' })
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot delete the user',
        debug_message: error.message,
      })
    }
  },

  /**
   * Add avatar to user
   */
  // addUserAvatar: async (req, res) => {
  //   try {
  //     const { id } = req.params
  //     const newUser = await editUser(id, { avatar: true })
  //     res.status(200).json(newUser)
  //   } catch (error) {
  //     res.status(500).json({
  //       public_message: 'Cannot add avatar',
  //       debug_message: error.message,
  //     })
  //   }
  // },
}
