'use strict'
var List = require('../models/list')
var User = require('../models/user')
var SharedList = require('../models/shared_list')

var controller = {
    /*añade un item a la lista de la compra del usuario cuyo id indique
    la cabecera de autenticación*/
    addSharedList: function(req,res){
        var sharedList = new SharedList();
        var params = req.body;
        sharedList.list = params.list;
        sharedList.user = req.user.sub;
            
        sharedList.save(sharedList, (err, sharedListStored) => {
            if(err) return res.status(500).send({message: 'Error al compartir lista.'});
            if(!sharedListStored) return res.status(404).send({message: 'No se ha podido compartir la lista.'});
            return res.status(200).send({sharedList: sharedListStored});
        });        
    },
    getSharedList: function(req,res){
        var sharedListId = req.params.id;
        if(sharedListId == null) return res.status(404).send({message: 'El recurso compartido no existe.'});
    
        SharedList.findById(sharedListId).exec((err, sharedList) => {
            if(err) return res.status(500).send({message: 'Error al recuperar el recurso compartido.'});
            if(!sharedList) return res.status(404).send({message: 'El recurso compartido no existe.'});
            return res.status(200).send({sharedList});
        })
    },
    getSharedLists: function(req,res){
        SharedList.find({}).exec((err, sharedLists) => {
            if(err) return res.status(500).send({message: 'Error al devolver listas compartidas.'});
            if(!sharedLists) return res.status(404).send({message: 'No hay listas compartidas que mostrar.'});
            return res.status(200).send({sharedLists});
        })
    },
    //deleteShoppingList: function(req,res){
    //    var shoppingListId = req.params.id;
    //    ShoppingList.findByIdAndRemove(shoppingListId, (err, shoppingListDeleted) => {
    //        if(err) return res.status(500).send({message: 'Error al borrar lista de la compra.'});
    //        if(!shoppingListDeleted) return res.status(404).send({message: 'No existe la lista de la compra a borrar'});
    //        return res.status(200).send({item: shoppingListDeleted})
    //    });
    //},
    //updateShoppingList: function(req,res){
    //    var shoppingListId = req.params.id;
    //    var update = req.body;
//
    //    ShoppingList.findByIdAndUpdate(shoppingListId, update, {new:true}, (err, shoppingListUpdated) => {
    //        if(err) return res.status(500).send({message: 'Error al actualizar lista de la compra.'});
    //        if(!shoppingListUpdated) return res.status(404).send({message: 'No existe la lista de la compra a actualizar'});
    //        return res.status(200).send({shoppingList: shoppingListUpdated})
    //     });
    //},
}

module.exports = controller;