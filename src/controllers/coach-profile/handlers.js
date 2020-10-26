'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { create, deleteOne, read, updateOne } = require('./queries')

module.exports = {

    /**
   *
   * @param {String} coachId required
   * @param {String} description optional
   * @param {string} description Optional
   * @param {string} company Optional
   * @param {array} sports Optional - Arrays of sports
   * @return coach profile
   */
    createCoachProfileHandler: async(
        coachId,
        description = "",
        company = "",
        sports = []
    ) => {

        if (!coachId) throw new Error('coachId is required')

        if (!ObjectId.isValid(coachId)) throw new Error('coachId is invalid')

        return await create(coachId, description, company, sports)
    },
    
    /**
     * @param {String} coachId required
     * @return coach profile
     */
    retrieveCoachProfileHandler: async(coachId) => {
        if (!coachId) throw new Error('coachId is required')

        if (!ObjectId.isValid(coachId)) throw new Error('coachId is invalid')
        
        const cp = await read({coach: coachId})
        return cp[0]
    },

    /**
     * @param {String} coachProfileId required
     * @param {Object} data required
     * @return updated coach profile
     */
    editCoachProfileHandler: async(
        coachProfileId,
        data,
    ) => {
        if (!coachProfileId) throw new Error('coachProfileId is required')

        if (!ObjectId.isValid(coachProfileId)) throw new Error('coachProfileId is invalid')

        return await updateOne({ _id: coachProfileId }, data, { new: true })
    },

    /**
     * @param {String} coachProfileId required
     **/
    removeCoachProfileHandler: async(coachProfileId) => {
        if (!coachProfileId) throw new Error('coachProfileId is required')

        if (!ObjectId.isValid(coachProfileId)) throw new Error('coachProfileId is invalid')

        return await deleteOne(coachProfileId)
    }
}