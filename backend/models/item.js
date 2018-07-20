'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = Schema({
    name: String,
    image: String,
    quantity: Number,
    minimum: Number,
    unit: String,
    notes: String,
    list: { type: Schema.ObjectId, ref:'List' }
});

module.exports = mongoose.model('Item', ItemSchema);