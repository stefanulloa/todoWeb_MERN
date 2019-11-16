const express = require('express');
const router = express.Router();

//item model
const User = require('../../models/User');

// @route POST api/users
// @description Register user
// @access Public
// only / because we already in api/items, not if we were in server.js
router.post('/', (req, res) => {
    res.send('register');
});

module.exports = router;
