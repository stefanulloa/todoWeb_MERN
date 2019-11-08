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
        .then(items => res.json(items));
});

// @route POST api/items
// @description Create Item
// @access Public
router.post('/', (req, res) => {
    //we only pass name because date is taken care of by mongodb
    const newItem = new Item({
        name: req.body.name
    });

    //actually saving it in db, then show item as json obj
    newItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @description Delete Item
// @access Public
router.delete('/:id', (req, res) => {
    //mongodb method
    //we are returning a message as response
    //in case the id item does not exist, we catch an show a 404 response
    Item.findById(req.params.id)
        .then(item => item.remove().then( () => res.json({success: true})))
        .catch(err => res.status(404).json({msg: "item with that id not found"}));
});
    

module.exports = router; 