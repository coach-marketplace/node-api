'use strict'

const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  editUser,
  editUserPassword,
  getUserPassword,
  getUserBody,
  editUserBody,
} = require('./handlers')
const { log } = require('../auth/handlers')
const { encryptString, compareHash } = require('../../_utils/hashing')
const { USER_ACCOUNT_TYPE } = require('../../_utils/constants')

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

  changeUserPassword: async (req, res) => {
    //TODO check if old password is okay
    try {
      const {
        body: { current: currentPassword, new: newPassword },
        params: { id },
        user,
      } = req

      if (!currentPassword) throw new Error('Password is required')
      if (!newPassword) throw new Error('New password is required')

      const localUserAccount = user.accounts.find(
        (account) => account.type === USER_ACCOUNT_TYPE.LOCAL,
      )
      const encryptedCurrentPassword = await encryptString(currentPassword)
      const encryptedCurrentPassword2 = await encryptString('azerty')

      const isMatcha = await compareHash('azerty', encryptedCurrentPassword2)
      const isMatch = compareHash(currentPassword, localUserAccount.password)
      console.log('1', encryptedCurrentPassword)
      console.log('1', encryptedCurrentPassword2)
      console.log('1', localUserAccount.password)
      console.log('+', isMatcha)
      console.log('+', isMatch)

      // var userinfos = await getUserPassword(id)
      // var encryptedCurrentPassword = userinfos.accounts[0].password
      // var pwdComparison = await compareHash(
      //   encryptedCurrentPassword,
      //   currentPassword,
      // )
      // if (!pwdComparison) {
      //   res.status(500).json({
      //     public_message: 'Password invalid',
      //     debug_message: 'Password invalid',
      //   })
      // } else {
      //   var encryptedNewPassword = await encryptString(newPassword)
      //   const newUser = await editUserPassword(id, encryptedNewPassword)

      //   res.status(200).json(newUser)
      // }
      res.status(200).json('ok')
    } catch (error) {
      res.status(500).json({
        public_message: 'Cannot change the user password',
        debug_message: error.message,
      })
    }
  },

  retrieveUserBody: async (req, res) => {
    try {
      let {
        params: { id }
      } = req;
      let userBody = await getUserBody(id);
      res.status(200).json(userBody);
    } catch (error) {
      res.status(500).json({
        public_message: "could not retrive user physical data",
        debug_message: error.message,
      })
    }
  },

  updateUserBody: async (req, res) => {
    try {
      let {
        body,
        params: { id }
      } = req;
      /*editUserBody(id, body).then(userBody => {
        console.log("coucou")
        console.log(userBody);
        res.status(200).json(userBody);
      })
      .catch(error => {
        res.status(500).json({
          public_message: "could not update user physical data",
          debug_message: error.message,
        })
      });*/
      let userBody = await editUserBody(id, body);
      console.log(userBody);
      res.status(200).json(userBody);

    } catch (error) {
      res.status(500).json({
        public_message: "could not update user physical data",
        debug_message: error.message,
      })
    }
  }

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
