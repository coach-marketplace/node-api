'use strict'

const {
  createUser,
  getUserById,
  getUserByEmail,
  getExposedUserData,
} = require('../user/handlers')
const {
  getExercisesByCoachId,
  createExercise,
  editExercise,
  deleteExercise,
} = require('../exercise/handlers')
const { addService, retrieveCoachServices } = require('../service/handlers')
const {
  getContactsByCoachId,
  createContact,
  getCoachLeadsById,
  getContactById,
} = require('../contact/handlers')
const {
  createWorkout,
  retrieveWorkoutsByOwnerId,
  retrieveWorkoutById,
  updateWorkout,
  deleteWorkout,
} = require('../workout/handlers')
const {
  createProgram,
  retrieveProgramsByOwnerId,
  updateProgram,
  deleteProgram,
  addTraineesToProgram,
  removeTraineesFromProgram,
} = require('../program/handlers')
const { LOCALES } = require('../../_utils/constants')

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
      public_message: 'Exercise can not be found',
      debug_message: error.message,
    })
  }
}

const retrieveCoachExercise = async (req, res) => {
  try {
    const { exercise } = req

    res.status(200).json(exercise)
  } catch (error) {
    res.status(500).json({
      public_message: 'Exercise can not be found',
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

    if (!LOCALES.includes(lang)) throw new Error('Lang is invalid')

    const newExercise = await createExercise(
      user._id,
      lang,
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

const editCoachExercise = async (req, res) => {
  try {
    const { body, exercise } = req

    const editedExercise = await editExercise(exercise._id, body)

    res.status(200).json(editedExercise)
  } catch (error) {
    res.status(500).json({
      public_message: 'Exercise can not be edited',
      debug_message: error.message,
    })
  }
}

//TODO: check if user ca remove this exercise
const deleteCoachExercise = async (req, res) => {
  try {
    let {
      params: { exerciseId },
    } = req
    if (!exerciseId) throw Error('Exercise id needed')

    await deleteExercise(exerciseId)

    res
      .status(200)
      .json({ message: `Exercise ${exerciseId} successfully deleted` })
  } catch (error) {
    res.status(500).json({
      public_message: 'Could not remove exercise',
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

const addWorkout = async (req, res) => {
  try {
    const {
      user,
      body: { isPrivate, lang, title, instructions, exercises },
    } = req

    if (!lang) throw new Error('Lang is required')

    if (!LOCALES.includes(lang)) throw new Error('Lang is invalid')

    const newWorkout = await createWorkout(
      user._id,
      lang,
      title,
      instructions,
      exercises || null,
      false,
      isPrivate,
    )
    res.status(201).json(newWorkout)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not create new workout',
      debug_message: error.message,
    })
  }
}

const retrieveWorkouts = async (req, res) => {
  try {
    const {
      params: { id },
    } = req

    const workouts = await retrieveWorkoutsByOwnerId(id)

    res.status(200).json(workouts)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not retrieve workout',
      debug_message: error.message,
    })
  }
}

const retrieveWorkout = async (req, res) => {
  try {
    const {
      params: { workoutId },
    } = req
    if (!workoutId) throw new Error('Workout id is required')

    const workout = await retrieveWorkoutById(workoutId)

    res.status(200).json(workout)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not retrieve workout',
      debug_message: error.message,
    })
  }
}

const editWorkout = async (req, res) => {
  try {
    const { body, workout } = req

    const updatedWorkout = await updateWorkout(workout._id, body)

    res.status(200).json(updatedWorkout)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not update workout',
      debug_message: error.message,
    })
  }
}

const removeWorkout = async (req, res) => {
  try {
    const {
      params: { workoutId },
    } = req

    await deleteWorkout(workoutId)

    res
      .status(200)
      .json({ message: `Workout ${workoutId} successfully deleted` })
  } catch (error) {
    res.status(500).json({
      public_message: 'could not delete workout',
      debug_message: error.message,
    })
  }
}

const addProgram = async (req, res) => {
  try {
    const {
      user,
      body: { isPrivate, days, workouts, lang, title, description },
    } = req

    const newProgram = await createProgram(
      user._id,
      days,
      lang,
      title,
      description,
      workouts || [],
      false,
      isPrivate,
    )

    res.status(201).json(newProgram)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not create new program',
      debug_message: error.message,
    })
  }
}

const retrievePrograms = async (req, res) => {
  try {
    const {
      params: { id },
    } = req

    const programs = await retrieveProgramsByOwnerId(id)

    res.status(200).json(programs)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not retrieve workout',
      debug_message: error.message,
    })
  }
}

const retrieveProgram = async (req, res) => {
  try {
    const { program } = req

    res.status(200).json(program)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not retrieve workout',
      debug_message: error.message,
    })
  }
}

const editCoachProgram = async (req, res) => {
  try {
    const { program, body } = req

    const updatedProgram = await updateProgram(program._id, body)

    res.status(200).json(updatedProgram)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not retrieve workout',
      debug_message: error.message,
    })
  }
}

const removeCoachProgram = async (req, res) => {
  try {
    const {
      params: { programId },
    } = req

    await deleteProgram(programId)

    res
      .status(200)
      .json({ message: `Program ${programId} successfully deleted` })
  } catch (error) {
    res.status(500).json({
      public_message: 'could not retrieve workout',
      debug_message: error.message,
    })
  }
}

const assignTraineesToProgram = async (req, res) => {
  try {
    const {
      program,
      body: { trainees },
    } = req

    const updatedProgram = await addTraineesToProgram(program, trainees)

    res.status(200).json(updatedProgram)
  } catch (error) {
    res.status(500).json({
      public_message: 'Could not assign',
      debug_message: error.message,
    })
  }
}

const unassignTraineesToProgram = async (req, res) => {
  try {
    const {
      program,
      body: { trainees },
    } = req

    const updatedProgram = await removeTraineesFromProgram(program, trainees)

    res.status(200).json(updatedProgram)
  } catch (error) {
    res.status(500).json({
      public_message: 'Could not assign',
      debug_message: error.message,
    })
  }
}

module.exports = {
  addServiceToCoach,
  getCoachServices,
  retrieveCoachExercises,
  retrieveCoachExercise,
  addExerciseToCoach,
  editCoachExercise,
  addCustomerToCoach,
  retrieveCoachCustomers,
  searchUserAsCoach,
  deleteCoachExercise,
  addWorkout,
  retrieveWorkouts,
  retrieveWorkout,
  editWorkout,
  removeWorkout,
  addProgram,
  retrievePrograms,
  assignTraineesToProgram,
  unassignTraineesToProgram,
  retrieveProgram,
  editCoachProgram,
  removeCoachProgram,
}
