'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SharedListSchema = Schema({
    user: { type: Schema.ObjectId, ref:'User' },
    list: { type: Schema.ObjectId, ref:'List' }
});

module.exports = mongoose.model('SharedList', SharedListSchema);