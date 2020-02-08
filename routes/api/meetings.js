const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const gravatar = require('gravatar');
const mongoose = require('mongoose');
const config = require('config');
const { check, validationResult } = require('express-validator');

//const Member = require('../../models/Members');
const Meeting = require('../../models/Meeting');

// @route   GET api/meetings
// @desc    Get meeting
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const { meeting_id } = req.body;
        if (!meeting_id) {
            return res.status(400).json({ msg: 'Unsupported request' });
        }
        //first see if the value passed in is an id object we can use
        try {
            const mtgID = mongoose.Types.ObjectId(meeting_id);
        } catch (error) {
            return res.status(400).json({ msg: 'invalid request value' });
        }
        // const meeting_id = '112';
        // get the meeting and the names of the presenter and worship
        const meeting = await Meeting.findById(
            mongoose.Types.ObjectId(meeting_id)
        ).populate('presenter', ['name']);
        // .populate('presenter', ['name'])
        // .populate('worship', ['name']);

        //if we don't get meeting, send back an error
        if (!meeting) {
            return res.status(400).json({ msg: 'No meeting found' });
        }
        // if we made it here, we have meeting and return it.
        res.json(meeting);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/meetings
// @desc    Add meeting
// @access  Public
router.post(
    '/',
    [
        check('title', 'Meeting title is required')
            .not()
            .isEmpty(),
        check('meetingDate', 'Meeting Date is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log('about to load');
        // get all the values defined in model
        const {
            title,
            meetingDate,
            presenter,
            attendance,
            worship,
            meal,
            mealCount,
            nurseryCount,
            childrenCount,
            youthCount,
            donations,
            notes
        } = req.body;

        // Build profile object
        const memberFields = new Member();
        memberFields.name = name; //required, no reason to check
        if (email) memberFields.email = email;
        memberFields.status = true; //default status true (active)
        if (phone) memberFields.phone = phone;
        if (street) memberFields.street = street;
        if (city) memberFields.city = city;
        if (state) memberFields.state = state;
        if (avatar) memberFields.state = avatar;
        if (gender) memberFields.gender = gender;
        console.log('about to try');
        try {
            // Using upsert option (creates new doc if no match is found):
            // let member = await Member.findOneAndUpdate(
            //     { $set: memberFields },
            //     { new: true, upsert: true }
            // );
            await memberFields.save();
            res.json(memberFields);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
