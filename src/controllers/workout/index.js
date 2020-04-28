'use strict'

const {
  createWorkout,
  //retrieveWorkouts,
  retrieveWorkoutByCoachId,
  retrieveWorkoutById,
  updateWorkout,
  removeWorkout,
} = require('./handlers')
const { getLangByISO } = require('../lang/handlers')
const { ACCEPTED_LANGS } = require('../../_utils/constants')

module.exports = {
  AddNewWorkoutToCoach: async (req, res) => {
    try {
      const {
        user,
        body: { isArchived, isPrivate, lang, title, content, exercises },
      } = req
      if (!lang) throw new Error('Lang is required')

      console.log("coucou")
      console.log(exercises)

      if (!ACCEPTED_LANGS.includes(lang)) throw new Error('Lang is invalid')

      const language = await getLangByISO(lang)
      const newWorkout = await createWorkout(
        user._id,
        language._id.toString(),
        title,
        content,
        isArchived,
        isPrivate,
        exercises
      )
      res.status(201).json(newWorkout)
    } catch (error) {
      res.status(500).json({
        public_message: 'could not create new workout',
        debug_messag: error.message,
      })
    }
  },

  retrieveWorkoutByCoachId: async (req, res) => {
     try {
       let {
         params: { id },
       } = req
       if (!id) throw new Error('Workout id is required')

       let workout = await retrieveWorkoutByCoachId(id)

       res.status(200).json(workout)
     } catch (error) {
       res.status(500).json({
         public_message: 'could not retreive workout',
         debug_message: error.message,
       })
     }
  },

  retrieveWorkoutById: async (req, res) => {
    try {
      let {
        params: { id },
      } = req
      if (!id) throw new Error('Workout id is required')

      let workout = await retrieveWorkoutById(id)

      res.status(200).json(workout)
    } catch (error) {
      res.status(500).json({
        public_message: 'could not retreive workout',
        debug_message: error.message,
      })
    }
  },

  updateWorkout: async (req, res) => {
    try {
      let {
        body,
        params: { id },
      } = req
      console.log("id: "+id)
      if (!id) throw new Error('workout id is required')

      let updatedWorkout = await updateWorkout(id, body)

      res.status(200).json(updatedWorkout)
    } catch (error) {
      res.status(500).json({
        public_message: 'could not update workout',
        debug_message: error.message,
      })
    }
  },

  removeWorkout: async (req, res) => {
    try {
      let {
        params: { id },
      } = req
      if (!id) throw new Error('Workout id needed')

      await removeWorkout(id)

      res.status(200).json({ message: 'workout deleted' })
    } catch (error) {
      res.status(500).json({
        public_message: 'could not delete workout',
        debug_message: error.message,
      })
    }
  },
}
