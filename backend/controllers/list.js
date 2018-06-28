'use strict'
var List = require('../models/list')
var Item = require('../models/item')
var User = require('../models/user')

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
        List.find({}).exec((err, lists) => {
            if(err) return res.status(500).send({message: 'Error al devolver listas.'});
            if(!lists) return res.status(404).send({message: 'No hay listas que mostrar.'});                   
            return res.status(200).send({lists});
        })
    },
    getList: function(req,res){
        var listId = req.params.id;
        if(listId == null) return res.status(404).send({message: 'La lista no existe.'});

        List.findById(listId).lean().exec((err, list) => {
            if(err) return res.status(500).send({message: 'Error al devolver lista.'});
            if(!list) return res.status(404).send({message: 'La lista no existe.'});
            /*queremos que list esté disponible desde el siguiente callback para devolver el resultado cuando 
            tengamos el count */
            var list = list; 
            Item.count({'list': list._id}, (err,count) => {
                console.log(list);
                if(err) return res.status(500).send({message: 'Error al contar elementos de la lista.'});
                list.elements = count;
                return res.status(200).send({list});
            })   
            
        })
    },
    deleteList: function(req,res){
        var listId = req.params.id;
        List.findByIdAndRemove(listId, (err, listDeleted) => {
            if(err) return res.status(500).send({message: 'Error al borrar lista.'});
            if(!listDeleted) return res.status(404).send({message: 'No existe la lista a borrar'});
            return res.status(200).send({list: listDeleted})
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