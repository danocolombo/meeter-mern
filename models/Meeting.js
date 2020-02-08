const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    meetingDate: {
        type: Date,
        required: true
    },
    presenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    attendance: {
        type: Number
    },
    // worship: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users'
    // },
    meal: {
        type: String
    },
    mealCount: {
        type: Number
    },
    nurseryCount: {
        type: Number
    },
    childrenCount: {
        type: Number
    },
    youthCount: {
        type: Number
    },
    donations: {
        type: Number
    },
    notes: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('meetings', MeetingSchema);
