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
        var item = new Item();
        var params = req.body;
        item.name = params.name;
        item.quantity = params.quantity;
        item.minimum = params.minimum;
        item.unit = params.unit;
        item.notes = params.notes;
        item.save((err, itemStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar item.'});
            if(!itemStored) return res.status(404).send({message: 'No se ha podido guardar el item.'});
            return res.status(200).send({item: itemStored});
        });
    },

}

module.exports = controller;