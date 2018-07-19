'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShoppingListSchema = Schema({
    quantity: Number,
    checked: Boolean,
    user: { type: Schema.ObjectId, ref:'User' },
    item: { type: Schema.ObjectId, ref:'Item' }
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);