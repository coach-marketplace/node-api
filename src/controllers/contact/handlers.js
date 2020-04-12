'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { read, create } = require('./queries')
const { CONTACT_TYPE } = require('../../_utils/constants')

module.exports = {
  /**
   * @param {string} ownerId Id of the contact owner
   * @param {string} leadId Id of the contact lead
   * @return {object} New contact
   */
  createContact: async (ownerId, leadId) => {
    if (!ownerId) throw new Error('OwnerId is required')

    if (!ObjectId.isValid(ownerId)) throw new Error('OwnerId is invalid')

    if (!leadId) throw new Error('leadId is required')

    if (!ObjectId.isValid(leadId)) throw new Error('leadId is invalid')

    const newContact = await create(ownerId, leadId, CONTACT_TYPE.TRAINEE)

    return newContact
  },

  /**
   * @param {string} coachId Id of the coach
   * @return {object} Contact
   */
  getContactsByCoachId: async (coachId) => {
    const contacts = await read({ owner: coachId }).populate('lead')

    return contacts
  },

  /**
   * @param {string} id Id of the contact
   * @return {object} Contact
   */
  getContactById: async (id) => {
    const contact = await read({ _id: id }).populate('lead')

    return contact[0]
  },

  /**
   * @param {string} coachId Id of the coach
   * @param {string} leadId Id of the lead
   * @return {array} List of matching contacts
   */
  getCoachLeadsById: async (coachId, leadId) => {
    const contacts = await read({ owner: coachId, lead: leadId }).populate(
      'lead',
    )

    return contacts
  },
}
