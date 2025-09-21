const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    patName: {
        type: String,
        required: true
    },
    patPhone: {
        type: String,
        required: true
    },
    interests: {
        type: [String],
        validate: [array => array.length > 0, 'Atleast click one of the checkboxes'],
        enum: ['blood', 'plasma', 'platelets']
    },
    group: {
        type: String,
        required: true
    },
    units: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hosName: {
        type: String,
        required: true
    },
    hosAddress: {
        type: String,
        required: true
    },
    attName: {
        type: String,
        required: true
    },
    attPhone: {
        type: String,
        required: true
    },
    attEmail: { 
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    attRelation: {
        type: String,
        required: true
    },
    status: { 
        type: String, 
        default: 'pending' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('requestModel',requestSchema);