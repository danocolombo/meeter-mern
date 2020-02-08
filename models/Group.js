const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    meetingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'meetings'
    },
    facilitator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member'
    },
    cofacilitator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        type: String
    },
    attendance: {
        type: String
    },
    notes: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('groups', GroupSchema);
