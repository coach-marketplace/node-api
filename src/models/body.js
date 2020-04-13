var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bodySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,

    height: {
        value: Number,
        metric: {
            type: String,
            enum: ["cm", "in"]
        },
    },
    weight: [{
        date: Date,
        value: Number,
        metric: {
            type: String,
            enum: ["kg", "lb"]
        },
    }],
    Birthdate: Date,
    gender: {
        type: Number,
        enum: ["Female", "Male", "Other"]
    }
}); 

module.exports = mongoose.model("Body", bodySchema);