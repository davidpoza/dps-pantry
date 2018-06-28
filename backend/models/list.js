'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = Schema({
    name: String,
    user: { type: Schema.ObjectId, ref:'User',
    elements: Number }
});

module.exports = mongoose.model('List', ListSchema);