'use strict'

const {
  createWorkout,
  retrieveWorkouts,
  retrieveWorkout,
  updateWorkout,
  removeWorkout,
} = require('./handlers')
const { getLangByISO } = require('../lang/handlers')

module.exports = {
    createWorkout = async (req, res) => {
        try {
            let {
                userOwnerId,
                isArchived,
                isPrivate,
                lang,
                name,
                instructions,
                exercises,
            } = req;
            if (!lang) throw new Error('Lang is required')

            if (!userOwnerId) throw new Error('userOwnerId is required')

            if (!acceptedLanguagesValue.includes(lang))
                throw new Error('Lang is invalid')
            
            const language = await getLangByISO(lang)
            const newExercise = await createWorkout(
                userOwnerId,
                isArchived,
                isPrivate,
                language._id.toString(),
                name,
                instructions,
                exercises
            );
            res.status(200).json(newExercise);
        } catch(error) {
            res.status(500).json({
                public_message: "could not create new workout",
                debug_messag: error,
            });
        }
    },

    retrieveWorkouts: async(req, res) => {
        try {
            let workouts = await this.retrieveWorkouts();

            res.status(200).json(workouts);
        } catch(error) {
            res.status(500).json({
                public_message: "could not retrieve workouts",
                debug_message: error,
            });
        }
    },

    retrieveWorkoutByCoachId: async(req, res) => {
        try {
            let {
                params: { id },
            } = req;
            if(!id) throw new Error("Workout id is required");

            let workout = await this.retrieveWorkout(id);

            res.status(200).json(workout);
        } catch(error) {
            res.status(500).json({
                public_message: "could not retreive workout",
                debug_message: error,
            });
        }
    },

    updateWorkout: async (req, res) => {
        try {
            let {
                body,
                param: {id}
            } = req;
            if(!id) throw new Error("workout id is required");

            let updatedWorkout = await updatedWorkout(id, body);

            res.status(200).json(updatedWorkout);
        } catch(error) {
            res.status(500).json({
                public_message: "could not update workout",
                debug_message: error,
            })
        }
    },

    removeWorkout: async (req, res) => {
        try{
            let {
                params: {id},
            } = req;
            if(!id) throw new Error("Workout id needed");

            await removeWorkout(id);

            res.status(200).json({message:"workout deleted"});
        } catch(error) {
            res.status(500).json({
                public_message: "could not delete workout",
                debug_message: error,
            });
        }
    },
}