'use strict'

const ObjectId = require('mongoose').Types.ObjectId

const { 
    createNewWorkout,
    deleteWorkout,
    readWorkout,
    updateWorkoutById,
    } = require('./queries')

module.exports = {
    /**
     * @param {string} userOwnerId Required
     * @param {boolean} isArchived Default: false
     * @param {boolean} isPrivate Default: false
     * @param {string} langId Required
     * @param {string} name Required
     * @param {string} instructions Optional
     * @param {Array} exercises Optional
     * @return Created Workout
     */
    createWorkout: async (
      userOwnerId,
      isArchived = false,
      isPrivate = false,
      langId,
      name,
      instructions,
      exercises
    ) => {
      if (!userOwnerId) throw new Error('userOwnerId is required')
  
      if (!ObjectId.isValid(userOwnerId))
        throw new Error('userOwnerId is incorrect')
  
      if (!langId) throw new Error('langId is required')
  
      if (!ObjectId.isValid(langId)) throw new Error('langId is incorrect')
  
      if (!name) throw new Error('name is required')
  
      const newWorkout = await createNewWorkout(
        userOwnerId,
        isArchived,
        isPrivate,
        langId.toString(),
        name,
        instructions,
        exercises
      )
  
      return newExercise
    },

    /**
     * @returns list of workouts
     */
    retrieveWorkouts: async () => {
        return await readWorkouts();
    },

    /**
     * @param {String} id required
     * é@returns exercise with id id
     */
    retrieveWorkoutByCoachId: async (id) => {
        if (!id) throw new Error('Workout id is required')
        
        if (!ObjectId.isValid(id))
            throw new Error('workout id is incorrect')

        return await readWorkout({userOwner: id});
    },

    /**
     * @param {String} id required
     * @param {Object} workoutData required
     * @returns updated workout
     */
    updateWorkout: async (id, workoutData) => {
        if (!id) throw new Error('WOrkout id is required')
        
        if (!ObjectId.isValid(id))
            throw new Error('workout id is incorrect')

        return await updateWorkoutById(id, workoutData);
    },

    /**
     * @param {string} id required
     */
    removeWorkout: async (id) => {
        if (!id) throw new Error('WOrkout id is required')
        
        if (!ObjectId.isValid(id))
            throw new Error('workout id is incorrect')

        return await deleteWorkout(id);
    }
}