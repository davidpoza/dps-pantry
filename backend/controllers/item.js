'use strict'
var Item = require('../models/item')

var controller = {
    getItems: function(req,res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    getItem: function(req,res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    updateItem: function(req,res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    deleteItem: function(req,res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    addItem: function(req,res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

}

module.exports = controller;