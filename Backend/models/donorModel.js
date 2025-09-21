const mongoose = require('mongoose');

const donorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    regno: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    patName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('donorModel', donorSchema);