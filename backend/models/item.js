'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = Schema({
    name: String,
    quantity: Number,
    minimum: Number,
    unit: String,
    notes: String
});

module.exports = mongoose.model('Item', ItemSchema);