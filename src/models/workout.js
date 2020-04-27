var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const workoutContentSchema = require('../schemas/workoutContent')
const workoutExercise = require("./workoutExercise");

var workoutSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,

        /**
     * The user responsible of this exercise
     */
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    isArchived: {
        type: Boolean,
        default: false,
    },

    isPrivate: {
        type: Boolean,
        default: false,
    },

    /**
     * Translatable content:
     * The content who can be written into different languages
     */
    content: [workoutContentSchema],    
    exercises: [workoutExercise],
}); 

module.exports = mongoose.model("Workout", workoutSchema);