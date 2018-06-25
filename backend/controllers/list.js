'use strict'
var List = require('../models/list')

var controller = {
    /*crea una lista que pertenece al usuario cuyo id indique
    la cabecera de autenticación*/
    addList: function(req,res){
        var list = new List();
        var params = req.body;
        list.name = params.name;
        list.user = req.user.sub;
       
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

}

module.exports = controller;