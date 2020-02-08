const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    cocaptain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    description: {
        type: String
    },
    status: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('teams', TeamSchema);
