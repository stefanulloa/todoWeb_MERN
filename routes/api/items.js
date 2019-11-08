const express = require('express');
const router = express.Router();

//item model
const Item = require('../../models/Item');

// @route GET api/items
// @description Get all Items
// @access Public
// only / because we already in api/items, not if we were in server.js
router.get('/', (req, res) => {
    //sort() is a mongodb method, -1 is descending
    //find() is a mongodb method, it returns a promise
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

module.exports = router; 