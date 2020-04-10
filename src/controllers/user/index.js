'use strict'

const { encryptString, compareHash } = require('../../_utils/hashing')
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  editUser,
  editUserPassword,
  getUserPassword,
} = require('./handlers')

module.exports = {
  createNewUser: async (req, res) => {
    try {
      const { email, firstName, lastName, phone, password, isCoach } = req.body

      if (!email) throw new Error('email is required')

      const user = await getUserByEmail(email)

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
  },

  retrieveUsers: async (_req, res) => {
    try {
      const users = await getAllUsers()

      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({
        public_message: 'Error to retrieves users',
        debug_message: error.message,
      })
    }
  },

  retrieveUser: async (req, res) => {
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
  },

  updateUser: async (req, res) => {
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
  },

  deleteUser: async (req, res) => {
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
  },

  /**
   * Update password for one user
   */
  updateUserPassword: async (req, res) => {
    //TODO check if old password is okay
    try {
      const {
        body: { currentPassword, newPassword },
        params: { id },
      } = req
      var userinfos = await getUserPassword(id)
      var encryptedCurrentPassword = userinfos.accounts[0].password
      var pwdComparison = await compareHash(
        encryptedCurrentPassword,
        currentPassword,
      )
      if (!pwdComparison) {
        res.status(500).json({
          public_message: 'Password invalid',
          debug_message: 'Password invalid',
        })
      } else {
        var encryptedNewPassword = await encryptString(newPassword)
        const newUser = await editUserPassword(id, encryptedNewPassword)
        res.status(200).json(newUser)
      }
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot update the user password',
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
