'use strict'

const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  /**
   * onlyMe middleware assume that is executed after JWT middleware who create
   * the req.user for us.
   */
  onlyMe: (req, res, next) => {
    try {
      const {
        user,
        params: { id },
      } = req

      if (!user) {
        throw new Error('No user token')
      }

      if (!id) {
        throw new Error(
          "No id, perhaps you don't use this middleware correctly",
        )
      }

      if (!ObjectId.isValid(id)) {
        throw new Error('Param id is incorrect')
      }

      if (id != user._id) {
        throw new Error('No corresponding id')
      }

      next()
    } catch (error) {
      res.status(401).json({
        public_message: 'Unauthorized',
        debug_message: error.message,
      })
    }
  },
}
