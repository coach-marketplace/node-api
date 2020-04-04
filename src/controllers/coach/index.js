'use strict'

// const ObjectId = require('mongoose').Types.ObjectId

// const { read: readUser, create: createUser } = require('../user/queries')
// const {
//   read: readContact,
//   create: createContact,
// } = require('../contact/queries')
// const { CONTACT_TYPES } = require('../../_utils/constants')
const { addService, retrieveCoachServices } = require('../service/handlers')

module.exports = {
  addServiceToCoach: async (req, res) => {
    try {
      if (!req.body.title) {
        throw new Error('Title is required')
      }

      const response = await addService({
        owner: req.user._id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        address: req.body.address,
        coordinates: req.body.coordinates,
        currency: req.body.currency,
      })

      res.status(201).json(response)
    } catch (error) {
      res.status(500).json({
        public_message: 'Service can not be added',
        debug_message: error.message,
      })
    }
  },

  getCoachServices: async (req, res) => {
    try {
      const response = await retrieveCoachServices(req.user._id)

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({
        public_message: 'Services can not be found',
        debug_message: error.message,
      })
    }
  },

  /**
   * Get all coaches
   *
   * A coach is a user which at least one listing
   */
  // retrieveCoaches: async (_req, res) => {
  //   try {
  //     res.status(200).json([]) // Actually there is no listing set so no coach
  //   } catch (error) {
  //     res.status(500).json({
  //       public_message: 'Error in get coaches',
  //       debug_message: error.message,
  //     })
  //   }
  // },

  // addCustomerToCoach: async (req, res) => {
  //   try {
  //     const { id } = req.params
  //     const { email, first_name, last_name, phone } = req.body

  //     if (!ObjectId.isValid(id)) {
  //       throw new Error('Coach param id is incorrect')
  //     }

  //     if (!email) {
  //       throw new Error('Customer email is required')
  //     }

  //     const coach = (await readUser({ _id: id }))[0]

  //     if (!coach) {
  //       throw new Error('No coach found')
  //     }

  //     /**
  //      * Check is there is already a user with this email
  //      */
  //     let lead = (await readUser({ email }))[0]

  //     if (!lead) {
  //       lead = await createUser({ email, first_name, last_name, phone })
  //     }

  //     const leadAsCoachContact = (
  //       await readContact({ owner: coach._id, lead: lead._id })
  //     )[0]

  //     /**
  //      * If the contact already exist, just send it back
  //      */
  //     if (leadAsCoachContact) {
  //       throw new Error('This contact is already your customer')
  //     }

  //     const newContact = await createContact({
  //       owner: coach._id,
  //       lead: lead._id,
  //       type: CONTACT_TYPES.TRAINEE,
  //     })

  //     res.status(200).json(newContact)
  //   } catch (error) {
  //     res.status(500).json({
  //       public_message: 'Error in adding customer to coach',
  //       debug_message: error.message,
  //     })
  //   }
  // },

  // getCoachCustomers: async (req, res) => {
  //   try {
  //     const { user: coach } = req

  //     const leads = await readContact({ owner: coach._id })

  //     const ids = leads.map(contact => contact.lead)

  //     const customers = await readUser({ _id: { $in: ids } })

  //     res.status(200).json(customers)
  //   } catch (error) {
  //     res.status(500).json({
  //       public_message: 'Error in adding customer to coach',
  //       debug_message: error.message,
  //     })
  //   }
  // },

  // getCoachCustomer: async (req, res) => {
  //   try {
  //     const {
  //       user: coach,
  //       params: { customerId },
  //     } = req

  //     const contact = (
  //       await readContact({ owner: coach._id, lead: customerId })
  //     )[0]

  //     if (!contact) {
  //       throw new Error('Customer not found 1')
  //     }

  //     const customer = (await readUser({ _id: contact.lead }))[0]

  //     if (!customer) {
  //       throw new Error('Customer not found 2')
  //     }

  //     res.status(200).json(customer)
  //   } catch (error) {
  //     res.status(500).json({
  //       public_message: 'Error in getting customer to coach',
  //       debug_message: error.message,
  //     })
  //   }
  // },
}
