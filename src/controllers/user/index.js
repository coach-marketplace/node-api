'use strict'

const { encryptString, compareHash } = require('../../_utils/hashing')
const {
  // create,
  getUsers,
  getUserById,
  editUser,
  removeUserById,
  editUserPassword,
  getUserPassword,
} = require('./queries.js')
const { createUser, retrieveUsers } = require('./handlers')

module.exports = {
  createNewUser: async (req, res) => {
    try {
      const users = await retrieveUsers({ email: req.body.email })

      if (users.length) {
        throw new Error('User already created')
      }

      const newUser = await createUser(req.body)

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
        body: { email, firstName, lastName, phone },
        params: { id },
      } = req
      const updatedData = {}
      email && (updatedData.email = email)
      firstName && (updatedData.firstName = firstName)
      lastName && (updatedData.lastName = lastName)
      phone && (updatedData.phone = phone);
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
   * Update password for one user
   */
  updateUserPassword: async (req, res) => {
    //TODO check if old password is okay
    try {
      const {
        body: { currentPassword, newPassword },
        params: { id },
      } = req
      var userinfos = await getUserPassword(id);
      var encryptedCurrentPassword = userinfos.accounts[0].password
      var pwdComparison = await compareHash(encryptedCurrentPassword, currentPassword);
      if(!pwdComparison){
        res.status(500).json({
          public_message: 'Password invalid',
          debug_message: 'Password invalid',
        })
      } 
      else {
        var encryptedNewPassword = await encryptString(newPassword);
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
