'use strict'
var Item = require('../models/item')
var User = require('../models/user')
var ShoppingList = require('../models/shopping_list')

var controller = {
    /*añade un item a la lista de la compra del usuario cuyo id indique
    la cabecera de autenticación*/
    addShoppingList: function(req,res){
        var shoppingList = new ShoppingList();
        var params = req.body;
        shoppingList.item = params.item;
        shoppingList.user = req.user.sub;
        shoppingList.quantity = params.quantity;
        shoppingList.checked = false;

        /*Comprobamos el item antes de insertarlo en la lista de la compra*/
                    
        Item.findById(params.item, (err, item) => {
            if(err) return res.status(500).send({message: 'Error al comprobar item.'});
            if(!item) return res.status(404).send({message: 'No existe el item.'});
            
            shoppingList.save(shoppingList, (err, shoppingListStored) => {
                if(err) return res.status(500).send({message: 'Error al guardar lista de la compra.'});
                if(!shoppingListStored) return res.status(404).send({message: 'No se ha podido guardar la lista de la compra.'});
                return res.status(200).send({shoppingList: shoppingListStored});
            });
        }) 
        
        
    },
    getShoppingList: function(req,res){
        var shoppingListId = req.params.id;
        if(shoppingListId == null) return res.status(404).send({message: 'La lista de la compra no existe.'});

        ShoppingList.findById(shoppingListId).exec((err, shoppingList) => {
            if(err) return res.status(500).send({message: 'Error al devolver lista de la compra.'});
            if(!shoppingList) return res.status(404).send({message: 'La lista de la compra no existe.'});
            return res.status(200).send({shoppingList});
        })
    },
    getShoppingListByUser: function(req,res){
        var userid = req.params.userid;
        if(userid == null) return res.status(404).send({message: 'No se ha indicado un usuario'});

        ShoppingList.find({user:userid}).populate('item').exec((err, shoppingList) => {
            if(err) return res.status(500).send({message: 'Error al devolver lista de la compra.'});
            if(!shoppingList) return res.status(404).send({message: 'La lista de la compra no existe.'});
            return res.status(200).send({shoppingList});
        })
    },
    getShoppingLists: function(req,res){
        ShoppingList.find({}).exec((err, shoppingLists) => {
            if(err) return res.status(500).send({message: 'Error al devolver listas de la compra.'});
            if(!shoppingLists) return res.status(404).send({message: 'No hay listas de la compra que mostrar.'});
            return res.status(200).send({shoppingLists});
        })
    },
    deleteShoppingList: function(req,res){
        var shoppingListId = req.params.id;
        ShoppingList.findByIdAndRemove(shoppingListId, (err, shoppingListDeleted) => {
            if(err) return res.status(500).send({message: 'Error al borrar lista de la compra.'});
            if(!shoppingListDeleted) return res.status(404).send({message: 'No existe la lista de la compra a borrar'});
            return res.status(200).send({item: shoppingListDeleted})
        });
    },
    updateShoppingList: function(req,res){
        var shoppingListId = req.params.id;
        var update = req.body;

        ShoppingList.findByIdAndUpdate(shoppingListId, update, {new:true}, (err, shoppingListUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar lista de la compra.'});
            if(!shoppingListUpdated) return res.status(404).send({message: 'No existe la lista de la compra a actualizar'});
            return res.status(200).send({shoppingList: shoppingListUpdated})
         });
    },
}

module.exports = controller;