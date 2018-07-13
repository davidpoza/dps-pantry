'use strict'
var List = require('../models/list')
var Item = require('../models/item')
var User = require('../models/user')
var SharedList = require('../models/shared_list')


var controller = {
    /*crea una lista que pertenece al usuario cuyo id indique
    la cabecera de autenticación*/
    addList: function(req,res){
        var list = new List();
        var params = req.body;
        list.name = params.name;
        list.user = req.user.sub;
        list.elements = 0;
       
        list.save((err, listStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar lista.'});
            if(!listStored) return res.status(404).send({message: 'No se ha podido guardar la lista.'});
            return res.status(200).send({item: listStored});
        });
    },
    getLists: function(req,res){
        List.find({user:req.user.sub}).exec((err, lists) => {
            /*hay que obtener las listas del usuario logado
            y despues añadirle las listas compartidas que tenga ese mismo usuario. */
            if(err) return res.status(500).send({message: 'Error al devolver listas.'});
            if(!lists) return res.status(404).send({message: 'No hay listas que mostrar.'});
            return res.status(200).send({lists});
            
        })
    },
    /* debemos comprobar que el usuario es el propietario o bien que la lista está compartida para el mismo*/
    getList: function(req,res){
        var listId = req.params.id;
        if(listId == null) return res.status(404).send({message: 'La lista no existe.'});
        List.findOne({_id: listId, user:req.user.sub}).exec((err, list) => {
            if(err) return res.status(500).send({message: 'Error al devolver lista.'});
            if(!list) {
                SharedList.findOne({list: listId, user:req.user.sub}).populate({path: 'list'}).exec((err, sharedlist) => {
                    if(err) return res.status(500).send({message: 'Error al devolver lista.'});
                    if(!sharedlist) return res.status(404).send({message: 'El usuario no tiene privilegios para visualizar la lista.'});
                    var list = sharedlist.list;
                    return res.status(200).send({list});
                });
            }
            else{
                return res.status(200).send({list});
            }
            
        })
    },
    /* borramos la lista, que debe pertenecer al usuario logado */
    deleteList: function(req,res){
        var listId = req.params.id;
        List.findOne({_id: listId, user: req.user.sub}, (err, list) => {            
            if(err) return res.status(500).send({message: 'Error al seleccionar lista.'});
            if(!list) return res.status(404).send({message: 'La lista no existe'});
            List.remove({_id: listId, user:req.user.sub}).exec((err) => {
                if(err) return res.status(500).send({message: 'Error al borrar lista.'});
                return res.status(200).send({list: list})
            });
        });
    },
    updateList: function(req,res){
        var listId = req.params.id;
        var update = req.body;
        //hay que enviar el campo user cuando se actualiza la entidad List
       
        User.findById(update.user, (err, user) => {
            if(err){
                console.log("Error al comprobar usuario propietario.");
                return res.status(500).send({message: 'Error al comprobar usuario propietario.'}); 
            } 
            if(!user){
                console.log("No existe el usuario propietario de la lista");
                return res.status(404).send({message: 'No existe el usuario propietario de la lista.'});
            }
            
            List.findByIdAndUpdate(listId, update, {new:true}, (err, listUpdated) => {
                if(err) return res.status(500).send({message: 'Error al actualizar lista.'});
                if(!listUpdated) return res.status(404).send({message: 'No existe la lista a actualizar'});
                return res.status(200).send({list: listUpdated})
             });      
        })   
       
                     
        
        
    },
}

module.exports = controller;