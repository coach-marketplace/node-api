'use strict'

const {
  createUser,
  getUserById,
  getUserByEmail,
  getExposedUserData,
} = require('../user/handlers')
const { getLangByISO } = require('../lang/handlers')
const {
  getExercisesByCoachId,
  createExercise,
  deleteExercise,
} = require('../exercise/handlers')
const { addService, retrieveCoachServices } = require('../service/handlers')
const {
  getContactsByCoachId,
  createContact,
  getCoachLeadsById,
  getContactById,
} = require('../contact/handlers')
const { LANG } = require('../../_utils/constants')

const addServiceToCoach = async (req, res) => {
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
}

const getCoachServices = async (req, res) => {
  try {
    const response = await retrieveCoachServices(req.user._id)

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({
      public_message: 'Services can not be found',
      debug_message: error.message,
    })
  }
}

const retrieveCoachExercises = async (req, res) => {
  try {
    const response = await getExercisesByCoachId(req.user._id)

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({
      public_message: 'Services can not be found',
      debug_message: error.message,
    })
  }
}

const addExerciseToCoach = async (req, res) => {
  try {
    const {
      body: { name, lang, instructions, videoUrl, isPrivate },
      user,
    } = req

    if (!name) throw new Error('Name is required')
    if (!lang) throw new Error('Lang is required')

    const acceptedLanguagesValue = Object.keys(LANG).map((k) =>
      LANG[k].NAME.toLowerCase(),
    )

    if (!acceptedLanguagesValue.includes(lang))
      throw new Error('Lang is invalid')

    const language = await getLangByISO(lang)
    const newExercise = await createExercise(
      user._id,
      language._id.toString(),
      name,
      null,
      instructions,
      videoUrl,
      isPrivate,
    )

    res.status(201).json(newExercise)
  } catch (error) {
    res.status(500).json({
      public_message: 'Exercise can not be added',
      debug_message: error.message,
    })
  }
}

//TODO: check if user ca remove this exercise
const removeExercise = async (req, res) => {
  try{
    let {
      params: { id },
    } = req;
    if(!id) throw Error("exercise id needed")

    await deleteExercise(id);
    
    res.status(200).json("ok");
  } catch(error) {
    res.status(500).json({
      public_message: "Could not remove exercise",
      debug_message: error.message,
    })
  }
}

const addCustomerToCoach = async (req, res) => {
  try {
    const {
      user: { _id },
      body: { email, firstName, lastName, phone, leadId },
    } = req

    let lead
    /**
     * Is no lead id we need to create the user
     */
    if (!leadId) {
      try {
        lead = await createUser(email, firstName, lastName, phone)
      } catch (error) {
        res.status(500).json({
          public_message: 'Cannot create the user',
          debug_message: error.message,
        })
      }
    } else {
      /**
       * Else we should add the existing user as a contact
       * In that case we check is the contact is not already present
       */
      lead = await getUserById(leadId)

      if (!lead) throw new Error('Lead not found')
      if (lead._id === _id) throw new Error('You cannot be your own customer')

      const leads = await getCoachLeadsById(_id, leadId)

      if (leads.length) throw new Error('Lead already a contact')
    }

    const newContact = await createContact(_id, lead._id)
    const newContactToSend = await getContactById(newContact._id)

    res.status(200).json(newContactToSend)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in adding customer to coach',
      debug_message: error.message,
    })
  }
}

const retrieveCoachCustomers = async (req, res) => {
  try {
    const {
      user: { _id },
    } = req

    const customers = await getContactsByCoachId(_id)

    res.status(200).json(customers)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in adding customer to coach',
      debug_message: error.message,
    })
  }
}

//TODO: why don't we return an array with possible matches ?
const searchUserAsCoach = async (req, res) => {
  try {
    const {
      query: { email },
    } = req

    const result = await getUserByEmail(email)

    res.status(200).json(result ? getExposedUserData(result) : null)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in adding customer to coach',
      debug_message: error.message,
    })
  }
}

module.exports = {
  addServiceToCoach,
  getCoachServices,
  retrieveCoachExercises,
  addExerciseToCoach,
  addCustomerToCoach,
  retrieveCoachCustomers,
  searchUserAsCoach,
  removeExercise,
}
