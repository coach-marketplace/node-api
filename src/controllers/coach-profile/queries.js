'use strict'

const mongoose = require('mongoose')

const CoachProfile = require('../../models/coach-profile')

module.exports = {

    /**
   * @param {string} coachId Required
   * @param {string} description Optional
   * @param {string} company Optional
   * @param {array} sports Optional - Arrays of sports
   * @return Created coach profile
   */
    create: async(
        coachId, 
        description = "", 
        company = "", 
        sports = []
    ) => {
        const newCoachProfile = new CoachProfile({
            _id: new mongoose.Types.ObjectId(),
            coach: new mongoose.Types.ObjectId(coachId),
            description: description,
            company: company,
            sports: sports
        })

        return newCoachProfile.save()
    },

    /**
   * @param {Object} query
   * @return CoachProfile Object
   */
    read: async(query = {}) => {
        return CoachProfile.find(query)
    },

    /**
   * @param {object} query Match
   * @param {object} data Data to update
   * @param {object} options Mongo options object
   * @return {object} Mongoose query object
   */
    updateOne: async(
        query = {},
        data = {},
        options= {},
    ) => {
        
        return CoachProfile.findOneAndUpdate(query, data, options)
    },

    /**
   *
   * @param {String} id required
   */
    deleteOne: async(id) => {
        return CoachProfile.deleteOne({ _id: { $eq: id } })
    }
}