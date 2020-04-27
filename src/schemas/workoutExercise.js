var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workoutExerciseSchema = new Schema({
    exercise: mongoose.Schema.Types.ObjectId,

    repetition: Number,

    weight: Number,

    time: Number,
}); 

module.exports = workoutExerciseSchema;