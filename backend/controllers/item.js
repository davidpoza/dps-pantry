'use strict'
var Item = require('../models/item')

var controller = {
    getItems: function(req,res){
        Item.find({}).exec((err, items) => {
            if(err) return res.status(500).send({message: 'Error al devolver items.'});
            if(!items) return res.status(404).send({message: 'No hay items que mostrar.'});
            return res.status(200).send({items});
        })
    },
    getItem: function(req,res){
        var itemId = req.params.id;
        if(itemId == null) return res.status(404).send({message: 'El item no existe.'});

        Item.findById(itemId, (err, item) => {
            if(err) return res.status(500).send({message: 'Error al devolver item.'});
            if(!item) return res.status(404).send({message: 'El item no existe.'});
            return res.status(200).send({item});
        })
    },
    updateItem: function(req,res){
        var itemId = req.params.id;
        var update = req.body;
        Item.findByIdAndUpdate(itemId, update, {new:true}, (err, itemUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar item.'});
            if(!itemUpdated) return res.status(404).send({message: 'No existe el item a actualizar'});
            return res.status(200).send({item: itemUpdated})
        });
    },
    deleteItem: function(req,res){
        var itemId = req.params.id;
        Item.findByIdAndRemove(itemId, (err, itemDeleted) => {
            if(err) return res.status(500).send({message: 'Error al borrar item.'});
            if(!itemDeleted) return res.status(404).send({message: 'No existe el item a borrar'});
            return res.status(200).send({item: itemDeleted})
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