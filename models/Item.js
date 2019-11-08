const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//it will be used on other files
module.exports = Item = mongoose.model('item',ItemSchema);