const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bodySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,

    height: {
        value: Number,
        metric: {
            type: String,
            enum: ["cm", "in"],
        },
    },

    weight: [{
        date: Date,
        value: Number,
        metric: {
            type: String,
            enum: ["kg", "lb"],
        }
    }],

    birthDate: Date,

    gender: {
        type: String,
        enum: ["Female", "Male", "Other"],
    }
});

module.exports = new mongoose.model("Body", bodySchema);