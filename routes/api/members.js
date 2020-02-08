const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Member = require('../../models/Members');

// bubba's id: 5e3e53d679f66d1b5b17dca0
// dave's id: 5e3e56505162ce1bc069c449

// @route   POST api/users
// @desc    Register user
// @access  Public
router.get(
    '/',
    [
        check('member_id', 'invalid request')
            .not()
            .isEmpty()
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log('we are going... somewhere');
        console.log(req);
        try {
            // get the member
            const member = await Member.findById(req.member_id);

            //if we don't get profile, send back an error
            if (!member) {
                return res
                    .status(400)
                    .json({ msg: 'There is no member found' });
            }
            // if we made it here, we have profile and return it.
            res.json(member);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   POST api/members
// @desc    Register member
// @access  Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log('about to load');
        // get all the values defined in model
        const {
            name,
            email,
            status,
            phone,
            street,
            city,
            state,
            avatar,
            gender
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
