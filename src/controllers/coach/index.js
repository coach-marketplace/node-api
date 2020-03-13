'use strict'

module.exports = {
  /**
   * Get all coaches
   *
   * A coach is a user which at least one listing
   */
  retrieveCoaches: async (_req, res) => {
    try {
      res.status(200).json([]) // Actually there is no listing set so no coach
    } catch (error) {
      res.status(500).json({
        public_message: 'Error in get coaches',
        debug_message: error.message,
      })
    }
  },
}
