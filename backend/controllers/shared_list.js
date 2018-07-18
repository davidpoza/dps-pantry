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
        SharedList.find({}).populate('list').exec((err, sharedLists) => {
            if(err) return res.status(500).send({message: 'Error al devolver listas compartidas.'});
            if(!sharedLists) return res.status(404).send({message: 'No hay listas compartidas que mostrar.'});
            return res.status(200).send({sharedLists});
        })
    },
    /* obtiene las listas compartidas con el usuario indicado */
    getSharedListByUser: function(req,res){
        var sharedListUser = req.params.user;
        SharedList.find({user:sharedListUser}).populate('list').lean().exec((err, sharedLists) => {
            if(err) return res.status(500).send({message: 'Error al devolver listas compartidas.'});
            if(!sharedLists) return res.status(404).send({message: 'No hay listas compartidas que mostrar.'});
            let lists = [];
            for (let i=0;i<sharedLists.length;i++){
                lists.push(sharedLists[i].list);
            }
            return res.status(200).send({lists});
        })
    },
    /* obtiene los usuarios con que ha sido compartida la lista indicada. */
    getUserBySharedList: function(req,res){
        var list = req.params.list;
        SharedList.find({list:list}).populate('user').exec((err, sharedLists) => {
            if(err) return res.status(500).send({message: 'Error al devolver listas compartidas.'});
            if(!sharedLists) return res.status(404).send({message: 'No hay listas compartidas que mostrar.'});
            let users = [];
            for (let i=0;i<sharedLists.length;i++){
                users.push(sharedLists[i].user);
            }
            return res.status(200).send({users});
        })
    },

    deleteSharedList: function(req,res){
        var sharedListId = req.params.id;
        SharedList.findByIdAndRemove(sharedListId, (err, sharedListDeleted) => {
            if(err) return res.status(500).send({message: 'Error al borrar lista compartida.'});
            if(!sharedListDeleted) return res.status(404).send({message: 'No existe la lista compartida a borrar'});
            return res.status(200).send({item: sharedListDeleted})
        });
    },
    updateSharedList: function(req,res){
        var sharedListId = req.params.id;
        var update = req.body;

        SharedList.findByIdAndUpdate(sharedListId, update, {new:true}, (err, SharedListUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar lista compartida.'});
            if(!SharedListUpdated) return res.status(404).send({message: 'No existe la lista compartida a actualizar'});
            return res.status(200).send({shoppingList: SharedListUpdated})
         });
    },
}

module.exports = controller;